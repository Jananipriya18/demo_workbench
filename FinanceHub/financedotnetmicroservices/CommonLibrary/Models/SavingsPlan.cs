using System;
using System.ComponentModel.DataAnnotations;

namespace CommonLibrary.Models
{
    public class SavingsPlan
    {
        public int SavingsPlanId { get; set; }

        [Required(ErrorMessage = "Plan name is required")]
        [StringLength(100, ErrorMessage = "Plan name cannot exceed 100 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Goal amount is required")]
        [Range(1000, 10000000, ErrorMessage = "Goal amount must be between 1,000 and 10,000,000")]
        public decimal GoalAmount { get; set; }

        [Required(ErrorMessage = "Time frame is required")]
        [Range(1, 50, ErrorMessage = "Time frame must be between 1 and 50 years")]
        public int TimeFrame { get; set; } // In years


        [Required(ErrorMessage = "Risk level is required")]
        [RegularExpression("Low|Medium|High", ErrorMessage = "Risk level must be Low, Medium, or High")]
        public string RiskLevel { get; set; } // Low, Medium, High

        [Required(ErrorMessage = "Description is required")]
        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Status is required")]
        [RegularExpression("Pending|Approved|Rejected", ErrorMessage = "Status must be Pending, Rejected or Approved")]
        public string Status { get; set; } 
    }
}
