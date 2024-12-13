using CommonLibrary.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [Route("api/ms/planapplications")]
    [ApiController]
    public class PlanApplicationController : ControllerBase
    {
        private readonly PlanApplicationService _planApplicationService;
        private readonly ApplicationDbContext _context;

        public PlanApplicationController(PlanApplicationService planApplicationService, ApplicationDbContext context)
        {
            _planApplicationService = planApplicationService;
            _context = context;
        }

        [Authorize(Roles = "FinancialConsultant, RegionalManager")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanApplication>>> GetAllPlanApplications()
        {
            var planApplications = await _planApplicationService.GetAllPlanApplications();
            return Ok(planApplications);
        }

        [Authorize(Roles = "Client, FinancialConsultant, RegionalManager")]
        [HttpGet("{applicationId}")]
        public async Task<ActionResult<PlanApplication>> GetPlanApplicationById(int applicationId)
        {
            var planApplication = await _planApplicationService.GetPlanApplicationById(applicationId);
            if (planApplication == null)
                return NotFound(new { message = "Cannot find any plan application" });

            return Ok(planApplication);
        }

        [Authorize(Roles = "Client")]
        [HttpPost]
        public async Task<ActionResult> AddPlanApplication([FromBody] PlanApplication planApplication)
        {
            try
            {
                var savingsPlan = await _context.SavingsPlans.FindAsync(planApplication.SavingsPlanId);
                if (savingsPlan == null)
                {
                    return NotFound(new { message = "Savings plan not found" });
                }

                // Validate the applied amount
                if (planApplication.AppliedAmount > savingsPlan.GoalAmount)
                {
                    return BadRequest(new { message = $"Applied amount must be less than {savingsPlan.GoalAmount}" });
                }

                // Proceed to add the plan application
                var success = await _planApplicationService.AddPlanApplication(planApplication);
                if (success)
                {
                    return Ok(new { message = "Plan application added successfully" });
                }
                else
                {
                    return StatusCode(500, new { message = "Failed to add plan application" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Client, RegionalManager, FinancialConsultant")]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PlanApplication>>> GetPlanApplicationsByUserId(int userId)
        {
            var planApplications = await _planApplicationService.GetPlanApplicationsByUserId(userId);
            return Ok(planApplications);
        }

        [Authorize(Roles = "Client, FinancialConsultant, RegionalManager")]
        [HttpPut("{applicationId}")]
        public async Task<ActionResult> UpdatePlanApplication(int applicationId, [FromBody] PlanApplication planApplication)
        {
            try
            {
                var success = await _planApplicationService.UpdatePlanApplication(applicationId, planApplication);
                if (success)
                    return Ok(new { message = "Plan application updated successfully" });
                else
                    return NotFound(new { message = "Cannot find any plan application" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Client")]
        [HttpDelete("{applicationId}")]
        public async Task<ActionResult> DeletePlanApplication(int applicationId)
        {
            try
            {
                var success = await _planApplicationService.DeletePlanApplication(applicationId);
                if (success)
                    return Ok(new { message = "Plan application deleted successfully" });
                else
                    return NotFound(new { message = "Cannot find any plan application" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
