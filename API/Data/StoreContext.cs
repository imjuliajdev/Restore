using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
public class StoreContext(DbContextOptions options):IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Cart> Carts { get; set; }
    public required DbSet<Category> Categories { get; set; }
    public required DbSet<Blog> Blogs { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    public required DbSet<Subscriber> Subscribers { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole{Id="5b350744-97d8-4b73-8638-addf6696277a", Name = "Member", NormalizedName = "MEMBER"},
                new IdentityRole{Id="0de9d292-46a1-475c-b76a-016cd5d4b7ff", Name = "Admin", NormalizedName = "ADMIN"}

        );
    }
}
    

    
    
