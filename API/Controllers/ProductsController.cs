using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.RequestHelpers;

namespace API.Controllers;

public class ProductsController(StoreContext context) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts(
        [FromQuery]ProductParams productParams)
    {
        // AsQueryable() is used to create 
        //a queryable object that can be used to build a LINQ query.
        var query = context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

        var products = await PagedList<Product>.ToPagedList(query, 
            productParams.PageNumber, productParams.PageSize);

        Response.AddPaginationHeader(products.MetaData);
        return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        return await context.Products.FindAsync(id) 
            ?? throw new Exception("Product not found");
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await context.Products.Select(x => x.Brand).Distinct().ToListAsync();
        var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();
        return Ok(new {brands, types});
    }
}