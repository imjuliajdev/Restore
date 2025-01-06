using System.ComponentModel.DataAnnotations;
using API.Data;

namespace API.Entities;

    public class Blog
    {
        [Key]
        public int Id { get; set; }
 
        [Required, MaxLength(100)]
        public required string Title { get; set; } 

        [MaxLength(125)]
        public required string Slug { get; set; } 

        [MaxLength(100)]
        public required string Image { get; set; }

        [Required, MaxLength(500)]
        public required string Excerpt { get; set; }

        public required string Content { get; set; }

        [Range(1,int.MaxValue,ErrorMessage="Please select a category")]
        public short CategoryId { get; set; }

        public required string UserId { get; set; } 
        public bool IsPublished { get; set; }
        public int ViewCount { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? PublishedAt { get; set; }
        public virtual required Category Category { get; set; }
       // public virtual ApplicationUser User { get; set; } 
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }

