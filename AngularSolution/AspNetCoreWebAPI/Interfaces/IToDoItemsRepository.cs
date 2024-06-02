using AspNetCoreWebAPI.DTOs;
using AspNetCoreWebAPI.Models;
using AspNetCoreWebAPI.Queries;

namespace AspNetCoreWebAPI.Interfaces
{
    public interface IToDoItemsRepository
    {
        Task<List<ToDoItem>> GetAllAsync(ToDoItemQueryObject queryObject);
        Task<ToDoItem?> GetByIdAsync(int id);
        Task<ToDoItem> PostAsync(ToDoItem toDoItem);
        Task<ToDoItem?> PutAsync(int id, ToDoItemPutDTO toDoItemDTO);
        Task<ToDoItem?> DeleteAsync(int id);
        Task<bool> ToDoItemExists(int id);
    }
}
