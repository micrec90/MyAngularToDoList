using AspNetCoreWebAPI.Context;
using AspNetCoreWebAPI.DTOs;
using AspNetCoreWebAPI.Interfaces;
using AspNetCoreWebAPI.Models;
using AspNetCoreWebAPI.Queries;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreWebAPI.Repositories
{
    public class ToDoItemsRepository : IToDoItemsRepository
    {
        private readonly ApplicationDBContext _context;
        public ToDoItemsRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<ToDoItem?> DeleteAsync(int id)
        {
            var toDoItem = await _context.ToDoItems.FirstOrDefaultAsync(x => x.Id == id);

            if (toDoItem == null)
                return null;

            _context.ToDoItems.Remove(toDoItem);
            await _context.SaveChangesAsync();

            return toDoItem;
        }

        public async Task<List<ToDoItem>> GetAllAsync(ToDoItemQueryObject queryObject)
        {
            var toDoItems = _context.ToDoItems.AsQueryable();
            if (!string.IsNullOrWhiteSpace(queryObject.Description))
            {
                toDoItems = toDoItems.Where(u => u.Description.Contains(queryObject.Description));
            }
            if (!string.IsNullOrWhiteSpace(queryObject.SortBy))
            {
                if (queryObject.SortBy.Equals("Description", StringComparison.OrdinalIgnoreCase))
                {
                    toDoItems = queryObject.IsDescending ? toDoItems.OrderByDescending(x => x.Description) : toDoItems.OrderBy(x => x.Description);
                }
            }
            if(queryObject.Done != null)
            {
                toDoItems = toDoItems.Where(u => u.Done ==  queryObject.Done);
            }
            if(queryObject.DueDate != null)
            {
                toDoItems = toDoItems.Where(u => u.DueDate.Date == queryObject.DueDate.Value.Date);
            }
            int skip = (queryObject.PageNumber - 1) * queryObject.PageSize;

            return await toDoItems.Skip(skip).Take(queryObject.PageSize).ToListAsync();
        }

        public async Task<ToDoItem?> GetByIdAsync(int id)
        {
            return await _context.ToDoItems.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ToDoItem> PostAsync(ToDoItem toDoItem)
        {
            await _context.ToDoItems.AddAsync(toDoItem);
            await _context.SaveChangesAsync();
            return toDoItem;
        }

        public async Task<ToDoItem?> PatchAsync(int id, ToDoItemPatchDTO toDoItemDTO)
        {
            var toDoItem = await _context.ToDoItems.FirstOrDefaultAsync(x => x.Id == id);

            if (toDoItem == null)
                return null;

            toDoItem.Description = toDoItemDTO.Description;
            toDoItem.Done = toDoItemDTO.Done;
            toDoItem.DueDate = toDoItemDTO.DueDate;

            _context.Entry(toDoItem).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return toDoItem;
        }

        public async Task<bool> ToDoItemExists(int id)
        {
            return await _context.ToDoItems.AnyAsync(e => e.Id == id);
        }
    }
}
