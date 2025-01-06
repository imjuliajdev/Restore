using API.Entities;
using System.ComponentModel.DataAnnotations;

namespace API.Data;

    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Content { get; set; }

        public DateTime CreatedAt { get; set; }

        public string? UserId { get; set; }
        //public virtual ApplicationUser? User { get; set; }

        public int BlogPostId { get; set; }
        public virtual Blog Blog { get; set; } = null!;
    }
