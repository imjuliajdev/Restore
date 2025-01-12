using API.Entities;
using API.DTOs;

namespace API.Extensions;

public static class CartExtensions
{
    public static CartDto ToDto(this Cart cart)
    {
        return new CartDto
        {
            CartId = cart.CartId,
            Items = cart.Items.Select(x => new CartItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                PictureUrl = x.Product.PictureUrl,
                Brand = x.Product.Brand,
                Type = x.Product.Type,
                Quantity = x.Quantity
            }).ToList()
        };
    }
}