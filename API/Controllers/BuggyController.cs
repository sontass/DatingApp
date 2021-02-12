using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        // [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() {
            return "secret text";
        }

         
        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound() {
         var thing = _context.Users.Find(-1);
         if(thing == null)  return NotFound();
         return Ok(thing);
        }
        
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError() {
              var thing = _context.Users.Find(-1);            
            var thingToReturn = thing.ToString();
            return thingToReturn;

        }

         // [Authorize]
        [HttpGet("bad-request")]
        public ActionResult<AppUser> GetBadRequest() {
            return BadRequest("Thia was not a good request");
        }    

          [HttpGet("GetScript")]
        public  async Task<ActionResult<AppUser>>  GetScript() {
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);            

            foreach(var user in users) {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("sin442"));
                user.PasswordSalt = hmac.Key;

                _context.Users.Add(user);
            }
            
            await _context.SaveChangesAsync();
            
             return Ok("Thia was not a good request");
        }   
         
    }
}