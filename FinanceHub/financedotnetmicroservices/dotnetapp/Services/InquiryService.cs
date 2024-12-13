// // using dotnetapp.Data;
// // using CommonLibrary.Models;
// // using Microsoft.EntityFrameworkCore;
// // using System.Collections.Generic;
// // using System.Threading.Tasks;

// // namespace dotnetapp.Services
// // {
// //     public class InquiryService
// //     {
// //         private readonly ApplicationDbContext _context;

// //         public InquiryService(ApplicationDbContext context)
// //         {
// //             _context = context;
// //         }

// //         // Retrieve all inquiries with related PlanApplication data
// //         public async Task<IEnumerable<Inquiry>> GetAllInquiries()
// //         {
// //             return await _context.Inquiries
// //                                  .Include(i => i.PlanApplication) // Include related PlanApplication data
// //                                  .ThenInclude(pa => pa.SavingsPlan) // Include SavingsPlan details
// //                                  .Include(i => i.PlanApplication) // Include PlanApplication again to access the User
// //                                  .ThenInclude(pa => pa.User) // Include User details
// //                                  .ToListAsync();
// //         }

// //         // Retrieve a specific inquiry by its ID
// //         public async Task<Inquiry> GetInquiryById(int inquiryId)
// //         {
// //             return await _context.Inquiries
// //                                  .Include(i => i.PlanApplication) // Include related PlanApplication data
// //                                  .ThenInclude(pa => pa.SavingsPlan) // Include SavingsPlan details
// //                                  .Include(i => i.PlanApplication) // Include PlanApplication again to access the User
// //                                  .ThenInclude(pa => pa.User) // Include User details
// //                                  .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);
// //         }

// //         // Add a new inquiry
// //         public async Task<bool> AddInquiry(Inquiry inquiry)
// //         {
// //             _context.Inquiries.Add(inquiry);
// //             await _context.SaveChangesAsync();
// //             return true;
// //         }

// //         // Update an existing inquiry
// //         public async Task<bool> UpdateInquiry(int inquiryId, Inquiry inquiry)
// //         {
// //             var existingInquiry = await _context.Inquiries
// //                 .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);

// //             if (existingInquiry == null)
// //                 return false;

// //             // Update the existing inquiry with the new values, except for the InquiryId
// //             _context.Entry(existingInquiry).CurrentValues.SetValues(inquiry);

// //             await _context.SaveChangesAsync();
// //             return true;
// //         }

// //         // Delete an inquiry
// //         public async Task<bool> DeleteInquiry(int inquiryId)
// //         {
// //             var inquiry = await _context.Inquiries
// //                                         .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);
// //             if (inquiry == null)
// //                 return false;

// //             _context.Inquiries.Remove(inquiry);
// //             await _context.SaveChangesAsync();
// //             return true;
// //         }

// //         // Retrieve all inquiries for a specific user
// //         public async Task<IEnumerable<Inquiry>> GetInquiriesByUserId(int userId)
// //         {
// //             return await _context.Inquiries
// //                                 .Include(i => i.PlanApplication) // Include related PlanApplication data
// //                                 .ThenInclude(pa => pa.SavingsPlan) // Include SavingsPlan details
// //                                 .Include(i => i.PlanApplication) // Include PlanApplication again to access the User
// //                                 .ThenInclude(pa => pa.User) // Include User details
// //                                 .Where(i => i.PlanApplication.UserId == userId) // Filter by UserId
// //                                 .ToListAsync();
// //         }

// //     }
// // }


// using dotnetapp.Data;
// using CommonLibrary.Models;
// using Microsoft.EntityFrameworkCore;
// using System.Collections.Generic;
// using System.Threading.Tasks;

// namespace dotnetapp.Services
// {
//     public class InquiryService
//     {
//         private readonly ApplicationDbContext _context;

//         public InquiryService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         // Retrieve all inquiries with related User data
//         public async Task<IEnumerable<Inquiry>> GetAllInquiries()
//         {
//             return await _context.Inquiries
//                                  .Include(i => i.User) // Include User details
//                                  .ToListAsync();
//         }

//         // Retrieve a specific inquiry by its ID
//         public async Task<Inquiry> GetInquiryById(int inquiryId)
//         {
//             return await _context.Inquiries
//                                  .Include(i => i.User) // Include User details
//                                  .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);
//         }

//         // Add a new inquiry
//         public async Task<bool> AddInquiry(Inquiry inquiry)
//         {
//             _context.Inquiries.Add(inquiry);
//             await _context.SaveChangesAsync();
//             return true;
//         }

//         public async Task<bool> UpdateInquiry(int inquiryId, Inquiry updatedInquiry)
//         {
//             var existingInquiry = await _context.Inquiries
//                 .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);

//             if (existingInquiry == null)
//                 return false;

//             // Only update the properties that are allowed to be updated
//             existingInquiry.Message = updatedInquiry.Message;
//             // Add other properties as needed

//             try
//             {
//                 await _context.SaveChangesAsync();
//                 return true;
//             }
//             catch (DbUpdateException ex)
//             {
//                 // Log exception details
//                 Console.WriteLine($"Update failed: {ex.Message}");
//                 // Consider logging to a file or monitoring system
//                 return false;
//             }
//         }


//         // Delete an inquiry
//         public async Task<bool> DeleteInquiry(int inquiryId)
//         {
//             var inquiry = await _context.Inquiries
//                                         .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);
//             if (inquiry == null)
//                 return false;

//             _context.Inquiries.Remove(inquiry);
//             await _context.SaveChangesAsync();
//             return true;
//         }

//         // Retrieve all inquiries for a specific user
//         public async Task<IEnumerable<Inquiry>> GetInquiriesByUserId(int userId)
//         {
//             return await _context.Inquiries
//             .Where(i => i.UserId == userId)
//             .ToListAsync();

//         }
//     }
// }


using dotnetapp.Data;
using CommonLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dotnetapp.Services
{
    public class InquiryService
    {
        private readonly ApplicationDbContext _context;

        public InquiryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Inquiry>> GetAllInquiries()
        {
            return await _context.Inquiries
                                 .Include(i => i.User)
                                 .ToListAsync();
        }

        public async Task<Inquiry> GetInquiryById(int inquiryId)
        {
            return await _context.Inquiries
                                 .Include(i => i.User)
                                 .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);
        }

        public async Task<bool> AddInquiry(Inquiry inquiry)
        {
            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();
            return true;
        }

        // public async Task<bool> UpdateInquiry(int inquiryId, Inquiry updatedInquiry)
        // {
        //     var existingInquiry = await _context.Inquiries
        //         .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);

        //     if (existingInquiry == null)
        //         return false;

        //     existingInquiry.Message = updatedInquiry.Message;
        //     existingInquiry.Replied = updatedInquiry.Replied;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //         return true;
        //     }
        //     catch (DbUpdateException ex)
        //     {
        //         Console.WriteLine($"Update failed: {ex.Message}");
        //         return false;
        //     }
        // }

    public async Task<bool> UpdateInquiry(int inquiryId, Inquiry updatedInquiry)
{
    var existingInquiry = await _context.Inquiries
        .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);

    if (existingInquiry == null)
        return false;

    // Only update the Replied field, keep Message unchanged
    existingInquiry.Replied = updatedInquiry.Replied;

    try
    {
        await _context.SaveChangesAsync();
        return true;
    }
    catch (DbUpdateException ex)
    {
        Console.WriteLine($"Update failed: {ex.Message}");
        return false;
    }
}


        public async Task<bool> DeleteInquiry(int inquiryId)
        {
            var inquiry = await _context.Inquiries
                                        .FirstOrDefaultAsync(i => i.InquiryId == inquiryId);
            if (inquiry == null)
                return false;

            _context.Inquiries.Remove(inquiry);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Inquiry>> GetInquiriesByUserId(int userId)
        {
            return await _context.Inquiries
                                 .Where(i => i.UserId == userId) // Filter out replied inquiries
                                 .ToListAsync();
        }
    }
}
