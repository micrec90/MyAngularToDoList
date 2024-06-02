using AspNetCoreWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AspNetCoreWebAPI.Context
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}
