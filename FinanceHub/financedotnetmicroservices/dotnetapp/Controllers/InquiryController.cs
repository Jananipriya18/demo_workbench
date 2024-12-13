// using CommonLibrary.Models;
// using dotnetapp.Data;
// using dotnetapp.Services;
// using Microsoft.AspNetCore.Mvc;
// using System.Collections.Generic;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Authorization;

// namespace dotnetapp.Controllers
// {
//     [Route("api/ms/inquiries")]
//     [ApiController]
//     public class InquiryController : ControllerBase
//     {
//         private readonly InquiryService _inquiryService;

//         public InquiryController(InquiryService inquiryService)
//         {
//             _inquiryService = inquiryService;
//         }

//         [Authorize(Roles = "FinancialConsultant, RegionalManager, Client")]
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<Inquiry>>> GetAllInquiries()
//         {
//             var inquiries = await _inquiryService.GetAllInquiries();
//             return Ok(inquiries);
//         }

//         [Authorize(Roles = "Client,FinancialConsultant")]
//         [HttpGet("{inquiryId}")]
//         public async Task<ActionResult<Inquiry>> GetInquiryById(int inquiryId)
//         {
//             var inquiry = await _inquiryService.GetInquiryById(inquiryId);
//             if (inquiry == null)
//                 return NotFound(new { message = "Cannot find any inquiry" });

//             return Ok(inquiry);
//         }

//         [Authorize(Roles = "Client")]
//         [HttpPost]
//         public async Task<ActionResult> AddInquiry([FromBody] Inquiry inquiry)
//         {
//             try
//             {
//                 var success = await _inquiryService.AddInquiry(inquiry);
//                 if (success)
//                     return Ok(new { message = "Inquiry added successfully" });
//                 else
//                     return StatusCode(500, new { message = "Failed to add inquiry" });
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, new { message = ex.Message });
//             }
//         }

//         [Authorize(Roles = "FinancialConsultant")]
//         [HttpPut("{inquiryId}")]
//         public async Task<ActionResult> UpdateInquiry(int inquiryId, [FromBody] Inquiry inquiry)
//         {
//             try
//             {
//                 // Ensure the InquiryId is set from the URL and not modified in the JSON body
//                 inquiry.InquiryId = inquiryId;

//                 var success = await _inquiryService.UpdateInquiry(inquiryId, inquiry);
//                 if (success)
//                     return Ok(new { message = "Inquiry updated successfully" });
//                 else
//                     return NotFound(new { message = "Cannot find any inquiry" });
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, new { message = ex.Message });
//             }
//         }

//         [Authorize(Roles = "Client")]
//         [HttpDelete("{inquiryId}")]
//         public async Task<ActionResult> DeleteInquiry(int inquiryId)
//         {
//             try
//             {
//                 var success = await _inquiryService.DeleteInquiry(inquiryId);
//                 if (success)
//                     return Ok(new { message = "Inquiry deleted successfully" });
//                 else
//                     return NotFound(new { message = "Cannot find any inquiry" });
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, new { message = ex.Message });
//             }
//         }
//         [Authorize(Roles = "Client, FinancialConsultant")]
//         [HttpGet("user/{userId}")]
//         public async Task<ActionResult<IEnumerable<Inquiry>>> GetInquiriesByUserId(int userId)
//         {
//             try
//             {
//                 var inquiries = await _inquiryService.GetInquiriesByUserId(userId);
//                 return Ok(inquiries);
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, new { message = ex.Message });
//             }
//         }

//     }
// }


using CommonLibrary.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api/ms/inquiries")]
    [ApiController]
    public class InquiryController : ControllerBase
    {
        private readonly InquiryService _inquiryService;

        public InquiryController(InquiryService inquiryService)
        {
            _inquiryService = inquiryService;
        }

        // Get all inquiries (Authorized for FinancialConsultant, RegionalManager, Client)
        [Authorize(Roles = "FinancialConsultant, RegionalManager")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inquiry>>> GetAllInquiries()
        {
            var inquiries = await _inquiryService.GetAllInquiries();
            return Ok(inquiries);
        }

        // Get a specific inquiry by its ID (Authorized for Client, FinancialConsultant)
        [Authorize(Roles = "Client, FinancialConsultant")]
        [HttpGet("{inquiryId}")]
        public async Task<ActionResult<Inquiry>> GetInquiryById(int inquiryId)
        {
            var inquiry = await _inquiryService.GetInquiryById(inquiryId);
            if (inquiry == null)
                return NotFound(new { message = "Inquiry not found" });

            return Ok(inquiry);
        }

        // Add a new inquiry (Authorized for Client)
        [Authorize(Roles = "Client")]
        [HttpPost]
        public async Task<ActionResult> AddInquiry([FromBody] Inquiry inquiry)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // Ensure validation errors are returned

            try
            {
                var success = await _inquiryService.AddInquiry(inquiry);
                if (success)
                    return Ok(new { message = "Inquiry added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add inquiry" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // Update an existing inquiry (Authorized for FinancialConsultant)
        // [Authorize(Roles = "FinancialConsultant")]
        // [HttpPut("{inquiryId}")]
        // public async Task<ActionResult> UpdateInquiry(int inquiryId, [FromBody] Inquiry inquiry)
        // {
        //     if (!ModelState.IsValid)
        //         return BadRequest(ModelState); // Ensure validation errors are returned

        //     try
        //     {
        //         // Ensure the InquiryId is set from the URL and not modified in the JSON body
        //         inquiry.InquiryId = inquiryId;

        //         var success = await _inquiryService.UpdateInquiry(inquiryId, inquiry);
        //         if (success)
        //             return Ok(new { message = "Inquiry updated successfully" });
        //         else
        //             return NotFound(new { message = "Inquiry not found" });
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, new { message = ex.Message });
        //     }
        // }

            [Authorize(Roles = "FinancialConsultant")]
        [HttpPut("{inquiryId}")]
       public async Task<IActionResult> UpdateInquiry(int inquiryId, [FromBody] Inquiry inquiry)
        {
            // Validate the input
            if (inquiry == null || string.IsNullOrEmpty(inquiry.Replied))
            {
                return BadRequest("Replied field is required.");
            }

            // Ensure the InquiryId is set correctly
            inquiry.InquiryId = inquiryId;

            // Call the service method to update the inquiry
            var result = await _inquiryService.UpdateInquiry(inquiryId, inquiry);

            // Return appropriate response based on result
            if (result)
            {
                return Ok("Inquiry updated successfully.");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the inquiry.");
            }
        }


        // Delete an inquiry (Authorized for Client)
        [Authorize(Roles = "Client")]
        [HttpDelete("{inquiryId}")]
        public async Task<ActionResult> DeleteInquiry(int inquiryId)
        {
            try
            {
                var success = await _inquiryService.DeleteInquiry(inquiryId);
                if (success)
                    return Ok(new { message = "Inquiry deleted successfully" });
                else
                    return NotFound(new { message = "Inquiry not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // Get inquiries for a specific user (Authorized for Client, FinancialConsultant)
        [Authorize(Roles = "Client, FinancialConsultant")]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Inquiry>>> GetInquiriesByUserId(int userId)
        {
            try
            {
                var inquiries = await _inquiryService.GetInquiriesByUserId(userId);
                
                if (inquiries == null || !inquiries.Any())
                    return NotFound(new { message = "No inquiries found for this user" });

                return Ok(inquiries);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

    }
}
