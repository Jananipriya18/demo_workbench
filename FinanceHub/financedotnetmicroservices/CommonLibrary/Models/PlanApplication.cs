using System;
using System.ComponentModel.DataAnnotations;

namespace CommonLibrary.Models
{
    public class PlanApplication
    {
        public int PlanApplicationId { get; set; }

        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; } // Foreign Key to User (Client)

        [Required(ErrorMessage = "Plan ID is required")]
        public int SavingsPlanId { get; set; } // Foreign Key to SavingsPlan

        [Required(ErrorMessage = "Applied amount is required")]
        [Range(1, double.MaxValue, ErrorMessage = "Applied amount must be greater than 0")]
        public decimal AppliedAmount { get; set; } // Amount the client wishes to apply for

        [Required(ErrorMessage = "Status is required")]
        [RegularExpression("Pending|Approved|Rejected", ErrorMessage = "Status must be Pending, Approved, or Rejected")]
        public string Status { get; set; } // Pending, Approved, Rejected

        [Required(ErrorMessage = "Application date is required")]
        public DateTime ApplicationDate { get; set; }

        [StringLength(500, ErrorMessage = "Remarks cannot exceed 500 characters")]
        public string? Remarks { get; set; } // Optional remarks by the client

        public string? ProofDocument { get; set; } // File path or base64 string for proof document

        public User? User { get; set; }
        public SavingsPlan? SavingsPlan { get; set; }
    }
}