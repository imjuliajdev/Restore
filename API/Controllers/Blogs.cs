using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogsController(StoreContext context) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<List<Blog>>> GetBlog()
    {
        return await context.Blogs.Include(b => b.Category).ToListAsync();
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<Blog>> GetBlog(string slug)
    {
        return await context.Blogs.Include(b => b.Category).FirstOrDefaultAsync(b => b.Slug == slug) 
            ?? throw new Exception("Blog not found");
    }
}