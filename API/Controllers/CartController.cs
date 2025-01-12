using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using API.Data;
using API.DTOs;
using API.Extensions;

namespace API.Controllers;

public class CartController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        var cart = await RetrieveCart();
        if(cart == null) return NoContent();

       return cart.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity)
    {
        var cart = await RetrieveCart();
        
       cart ??= CreateCart();
       
       var product = await context.Products.FindAsync(productId);
       
       if(product == null) return BadRequest("Problem adding item to cart" );
       
       cart.AddItem(product, quantity);
        
        var result = await context.SaveChangesAsync() > 0;
        if(result) return CreatedAtAction(nameof(GetCart), cart.ToDto());
        return BadRequest("Problem adding item to cart" );
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
    {
        var cart = await RetrieveCart();
        
        if(cart == null) return BadRequest("Unable to retrieve Cart");

        cart.RemoveItem(productId,quantity);
        
        var result = await context.SaveChangesAsync() > 0;
        if(result) return Ok();
        return BadRequest("Problem updating cart");
    }

    private async Task<Cart?> RetrieveCart()
    {
        return await context.Carts
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.CartId == Request.Cookies["cartId"]);
    }

    private Cart CreateCart()
    {
        var cartId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions 
        { 
            IsEssential = true, 
            Expires = DateTime.UtcNow.AddDays(30) 
        };
        Response.Cookies.Append("cartId", cartId, cookieOptions);
        var cart = new Cart { CartId = cartId };
        context.Carts.Add(cart);
        return cart;
    }
}
