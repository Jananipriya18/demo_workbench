using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CommonLibrary.Models
{

public class Notification
{        
    [Key]
    public int NotificationId { get; set; }
    public int? UserId { get; set; } 
    public int? SavingsPlanId { get; set; } 
    public int?  PlanApplicationId{ get; set; } 
    public int? InquiryId { get; set; } 
    public string Message { get; set; } 
    public bool IsRead { get; set; } 
    public DateTime CreatedAt { get; set; } 
    public User? User { get; set; } 
    public Inquiry? Inquiry { get; set; } 
    public PlanApplication? PlanApplication { get; set; } 
    public SavingsPlan? SavingsPlan { get; set; } 
}
}