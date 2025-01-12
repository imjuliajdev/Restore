using System.ComponentModel.DataAnnotations.Schema;
namespace API.Entities;

[Table("CartItems")]
public class CartItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }

    //navigation properties

    //one to one relationship, 
    //one Carttem = one product
    public int ProductId { get; set; } 
    public required Product Product { get; set; }

    //one to many relationship, 
    //one cart can have many cart items
    public int CartId { get; set; }
    public Cart Cart { get; set; } = null!;

    
    
   
}
