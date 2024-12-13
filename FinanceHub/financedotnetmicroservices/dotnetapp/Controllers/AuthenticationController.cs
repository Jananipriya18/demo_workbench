using CommonLibrary.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    [Route("api/ms/")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ApplicationDbContext _context;

        public AuthenticationController(IAuthService authService, ApplicationDbContext context)
        {
            _authService = authService;
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new { Status = "Error", Message = "Invalid Payload" });

                var (status, token, user) = await _authService.Login(model);

                if (status == 0)
                    return BadRequest(new { Status = "Error", Message = token });

                return Ok(new { Status = "Success", Token = token, User = user });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(User model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new { Status = "Error", Message = "Invalid Payload" });

                if (model.UserRole == "Client" || model.UserRole == "FinancialConsultant" || model.UserRole == "RegionalManager")
                {
                    var (status, message) = await _authService.Registration(model, model.UserRole);
                    if (status == 0)
                    {
                        return BadRequest(new { Status = "Error", Message = message });
                    }
                    return Ok(new { Status = "Success", Message = message });
                }
                else
                {
                    return BadRequest(new { Status = "Error", Message = "Invalid user role" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
