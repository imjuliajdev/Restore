using System.ComponentModel.DataAnnotations;

namespace API.Entities;

    public class Category
    {
        public short Id { get; set; }
        [Required, MaxLength(50)]
        public required string Name { get; set; }
        public required string Slug { get; set; }
        public bool ShowOnNavbar { get; set; }
        
}
