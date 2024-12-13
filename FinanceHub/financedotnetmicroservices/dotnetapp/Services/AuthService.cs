using dotnetapp.Data;
using CommonLibrary.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        public async Task<(int status, string token, User user)> Login(LoginModel model)
        {
            // Retrieve the user from the identity store
            var applicationUser = await userManager.FindByEmailAsync(model.Email);

            // Retrieve the user details from the application's database
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

            // Validate user credentials
            if (applicationUser == null || !await userManager.CheckPasswordAsync(applicationUser, model.Password))
                return (0, "Invalid credentials", null);

            // Retrieve user roles
            var userRoles = await userManager.GetRolesAsync(applicationUser);

            // Create claims for the JWT
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, applicationUser.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            // Generate token
            string token = GenerateToken(authClaims);

            // Return the status, token, and user details
            return (1, token, user);
        }

        public async Task<(int status, string message)> Registration(User model, string role)
        {
            var userExists = await userManager.FindByEmailAsync(model.Email);

            if (userExists != null)
                return (0, "User already exists");

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };

            var createUserResult = await userManager.CreateAsync(user, model.Password);
            if (!createUserResult.Succeeded)
                return (0, "User creation failed! Please check user details and try again.");

            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await roleManager.RoleExistsAsync(UserRoles.User))
                await userManager.AddToRoleAsync(user, role);

            var user1 = new User
            {
                Username = model.Username,
                Password = model.Password,
                Email = model.Email,
                MobileNumber = model.MobileNumber,
                UserRole = model.UserRole,
            };
            _context.Users.Add(user1);
            await _context.SaveChangesAsync();

            return (1, "User created successfully!");
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:ValidIssuer"],
                Audience = _configuration["JWT:ValidAudience"],
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
