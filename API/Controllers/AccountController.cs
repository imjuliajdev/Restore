using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

public class AccountController(
    SignInManager<User> signInManager
    ) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
    {
        var user = new User{UserName = registerDto.Email, Email = registerDto.Email};
        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);
        
        if(!result.Succeeded){
            foreach(var error in result.Errors){
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }
        await signInManager.UserManager.AddToRoleAsync(user, "Member");
        return Ok();
    }

        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            if(User.Identity?.IsAuthenticated == false) return NoContent();

            var user = await signInManager.UserManager.GetUserAsync(User);

            if(user == null) return Unauthorized();

            var roles = await signInManager.UserManager.GetRolesAsync(user);

            return Ok(new 
            {
                user.Email, 
                user.UserName,
                Roles = roles,
            });

        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync(); //removes the cookie
            return NoContent();
        }

        [Authorize]
        [HttpPost("address")]
        public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address) 
        {
            var user = await signInManager.UserManager.Users
                .Include(x => x.Address)
                .FirstOrDefaultAsync(x => x.UserName == User.Identity!.Name);
    
            if(user == null) return Unauthorized();

            if(user.Address == null)
            {
                user.Address = address;
            }

            user.Address = address;
            var result = await signInManager.UserManager.UpdateAsync(user);
            if(!result.Succeeded) return BadRequest("Failed to update address");
            return Ok(user.Address);
        }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<Address>> GetAddress()
    {
        var address = await signInManager.UserManager.Users
            .Where(x => x.UserName == User.Identity!.Name)
            .Select(x => x.Address)
            .FirstOrDefaultAsync();

        if(address == null) return NoContent();
        return Ok(address);
    }
}