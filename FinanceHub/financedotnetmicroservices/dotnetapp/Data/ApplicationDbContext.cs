using CommonLibrary.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Data    
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<SavingsPlan> SavingsPlans { get; set; }
        public DbSet<PlanApplication> PlanApplications { get; set; }
        public DbSet<Inquiry> Inquiries { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


        }
    }
}
