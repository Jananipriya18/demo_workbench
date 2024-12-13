using CommonLibrary.Models;
using dotnetapp.Data;
using dotnetapp4.Services; // Update this to the correct namespace for SavingsPlanService
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp4.Controllers
{
    [Route("api/ms/savingsplans")]
    [ApiController]
    public class SavingsPlanController : ControllerBase
    {
        private readonly SavingsPlanService _savingsPlanService;

        public SavingsPlanController(SavingsPlanService savingsPlanService)
        {
            _savingsPlanService = savingsPlanService;
        }

        [Authorize(Roles = "FinancialConsultant, RegionalManager, Client")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavingsPlan>>> GetAllSavingsPlans()
        {
            var savingsPlans = await _savingsPlanService.GetAllSavingsPlans();
            return Ok(savingsPlans);
        }

        [Authorize(Roles = "FinancialConsultant, Client, RegionalManager")]
        [HttpGet("{savingsPlanId}")]
        public async Task<ActionResult<SavingsPlan>> GetSavingsPlanById(int savingsPlanId)
        {
            var savingsPlan = await _savingsPlanService.GetSavingsPlanById(savingsPlanId);
            if (savingsPlan == null)
                return NotFound(new { message = "Cannot find any savings plan" });

            return Ok(savingsPlan);
        }

        [Authorize(Roles = "FinancialConsultant")]
        [HttpPost]
        public async Task<ActionResult> AddSavingsPlan([FromBody] SavingsPlan savingsPlan)
        {
            try
            {
                var success = await _savingsPlanService.AddSavingsPlan(savingsPlan);
                if (success)
                    return Ok(new { message = "Savings plan added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add savings plan" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "FinancialConsultant, RegionalManager")]
        [HttpPut("{savingsPlanId}")]
        public async Task<ActionResult> UpdateSavingsPlan(int savingsPlanId, [FromBody] SavingsPlan savingsPlan)
        {
            try
            {
                // Ensure that the SavingsPlanId from the URL is used and not the one from the JSON body
                savingsPlan.SavingsPlanId = savingsPlanId;

                var success = await _savingsPlanService.UpdateSavingsPlan(savingsPlan);

                if (success)
                    return Ok(new { message = "Savings plan updated successfully" });
                else
                    return NotFound(new { message = "Cannot find any savings plan" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "FinancialConsultant")]
        [HttpDelete("{savingsPlanId}")]
        public async Task<ActionResult> DeleteSavingsPlan(int savingsPlanId)
        {
            try
            {
                var success = await _savingsPlanService.DeleteSavingsPlan(savingsPlanId);
                if (success)
                    return Ok(new { message = "Savings plan deleted successfully" });
                else
                    return NotFound(new { message = "Cannot find any savings plan" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
