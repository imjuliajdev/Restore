using System.ComponentModel.DataAnnotations;

namespace API.Entities;

    public class Subscriber
    {
        public long Id { get; set; }
        
        [EmailAddress, Required, MaxLength(150)]
        public required string Email { get; set; }
        
        [Required, MaxLength(25)]
        public required string Name { get; set; }
        public DateTime SubscribedOn { get; set; }
    }

