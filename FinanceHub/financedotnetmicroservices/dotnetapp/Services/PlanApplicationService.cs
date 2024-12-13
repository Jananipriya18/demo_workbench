using dotnetapp.Data;
using CommonLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public class PlanApplicationService
    {
        private readonly ApplicationDbContext _context;

        public PlanApplicationService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all plan applications
        public async Task<IEnumerable<PlanApplication>> GetAllPlanApplications()
        {
            return await _context.PlanApplications
                                 .Include(p => p.SavingsPlan) // Include related SavingsPlan data
                                 .Include(p => p.User) // Include related User data
                                 .ToListAsync();
        }

        // Retrieve a specific plan application by its ID
        public async Task<PlanApplication> GetPlanApplicationById(int planApplicationId)
        {
            return await _context.PlanApplications
                                 .Include(p => p.SavingsPlan) // Include related SavingsPlan data
                                 .Include(p => p.User) // Include related User data
                                 .FirstOrDefaultAsync(p => p.PlanApplicationId == planApplicationId);
        }

        // Add a new plan application
        public async Task<bool> AddPlanApplication(PlanApplication planApplication)
        {
            _context.PlanApplications.Add(planApplication);
            await _context.SaveChangesAsync();
            return true;
        }

        // Retrieve plan applications by user ID
        public async Task<IEnumerable<PlanApplication>> GetPlanApplicationsByUserId(int userId)
        {
            return await _context.PlanApplications
                                 .Include(p => p.SavingsPlan) // Include related SavingsPlan data
                                 .Include(p => p.User) // Include related User data
                                 .Where(p => p.UserId == userId)
                                 .ToListAsync();
        }

        // Update an existing plan application
        public async Task<bool> UpdatePlanApplication(int planApplicationId, PlanApplication planApplication)
        {
            var existingPlanApplication = await _context.PlanApplications
                                                        .FirstOrDefaultAsync(p => p.PlanApplicationId == planApplicationId);
            if (existingPlanApplication == null)
                return false;

            _context.Entry(existingPlanApplication).CurrentValues.SetValues(planApplication);
            await _context.SaveChangesAsync();
            return true;
        }

        // Delete a plan application
        public async Task<bool> DeletePlanApplication(int planApplicationId)
        {
            var planApplication = await _context.PlanApplications
                                                .FirstOrDefaultAsync(p => p.PlanApplicationId == planApplicationId);
            if (planApplication == null)
                return false;

            _context.PlanApplications.Remove(planApplication);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
