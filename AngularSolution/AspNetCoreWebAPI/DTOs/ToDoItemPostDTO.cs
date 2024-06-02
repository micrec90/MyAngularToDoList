using System.ComponentModel.DataAnnotations;

namespace AspNetCoreWebAPI.DTOs
{
    public class ToDoItemPostDTO
    {
        [Required]
        [MinLength(1)]
        public string Description { get; set; } = string.Empty;
        public bool Done { get; set; }
        public DateTime DueDate { get; set; } = DateTime.Now;
    }
}
