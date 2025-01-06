using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
public class StoreContext(DbContextOptions options):DbContext(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Category> Categories { get; set; }
    public required DbSet<Blog> Blogs { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    public required DbSet<Subscriber> Subscribers { get; set; }
}
    
    
    
