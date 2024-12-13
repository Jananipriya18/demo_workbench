using System;
using System.ComponentModel.DataAnnotations;

namespace CommonLibrary.Models
{
    public class Inquiry
    {
    
        public int InquiryId { get; set; }

        // [Required(ErrorMessage = "Savings Plan ID is required")]
        // public int? ApplicationId { get; set; } // Foreign Key to SavingsPlan

        [Required(ErrorMessage = "Message is required")]
        [StringLength(1000, ErrorMessage = "Message cannot exceed 1000 characters")]
        public string Message { get; set; }
        // public PlanApplication? PlanApplication { get; set; }

        public int UserId {get;set;}
        public User? User {get;set;}

        public string Replied { get; set; }
    }
}

