using AspNetCoreWebAPI.DTOs;
using AspNetCoreWebAPI.Models;

namespace AspNetCoreWebAPI.Mappers
{
    public static class ToDoItemMapper
    {
        public static ToDoItemGetDTO ToToDoItemGetDTO(this ToDoItem toDoItem)
        {
            return new ToDoItemGetDTO
            {
                Id = toDoItem.Id,
                Description = toDoItem.Description,
                Done = toDoItem.Done,
                CreatedOn = toDoItem.CreatedOn,
                DueDate = toDoItem.DueDate
            };
        }
        public static ToDoItem ToToDoItemFromPostDTO(this ToDoItemPostDTO toDoItemPostDTO)
        {
            return new ToDoItem
            {
                Description = toDoItemPostDTO.Description,
                Done = toDoItemPostDTO.Done,
                DueDate = toDoItemPostDTO.DueDate
            };
        }
    }
}
