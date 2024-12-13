using dotnetapp.Data;
using CommonLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp4.Services
{
    public class SavingsPlanService
    {
        private readonly ApplicationDbContext _context;

        public SavingsPlanService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Retrieve all savings plans
        public async Task<IEnumerable<SavingsPlan>> GetAllSavingsPlans()
        {
            return await _context.SavingsPlans.ToListAsync();
        }

        // Retrieve a specific savings plan by its ID
        public async Task<SavingsPlan> GetSavingsPlanById(int savingsPlanId)
        {
            return await _context.SavingsPlans
                                 .FirstOrDefaultAsync(sp => sp.SavingsPlanId == savingsPlanId);
        }

        // Add a new savings plan
        public async Task<bool> AddSavingsPlan(SavingsPlan savingsPlan)
        {
            try
            {
                _context.SavingsPlans.Add(savingsPlan);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                // Handle the exception (e.g., log it)
                return false;
            }
        }

        // Update an existing savings plan
        public async Task<bool> UpdateSavingsPlan(SavingsPlan savingsPlan)
        {
            var existingSavingsPlan = await _context.SavingsPlans
                .FirstOrDefaultAsync(sp => sp.SavingsPlanId == savingsPlan.SavingsPlanId);

            if (existingSavingsPlan == null)
                return false;

            try
            {
                // Update the existing savings plan with the new values
                _context.Entry(existingSavingsPlan).CurrentValues.SetValues(savingsPlan);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                // Handle the exception (e.g., log it)
                return false;
            }
        }

        // Delete a savings plan
        public async Task<bool> DeleteSavingsPlan(int savingsPlanId)
        {
            var savingsPlan = await _context.SavingsPlans
                .FirstOrDefaultAsync(sp => sp.SavingsPlanId == savingsPlanId);

            if (savingsPlan == null)
                return false;

            try
            {
                _context.SavingsPlans.Remove(savingsPlan);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                // Handle the exception (e.g., log it)
                return false;
            }
        }
    }
}
