﻿namespace AspNetCoreWebAPI.DTOs
{
    public class ToDoItemGetDTO
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool Done { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime DueDate { get; set; } = DateTime.Now;
    }
}
