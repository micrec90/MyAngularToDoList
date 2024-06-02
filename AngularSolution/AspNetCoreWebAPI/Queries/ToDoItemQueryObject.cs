namespace AspNetCoreWebAPI.Queries
{
    public class ToDoItemQueryObject
    {
        public string? Description { get; set; } = null;
        public bool? Done { get; set; } = null;
        public DateTime? CreatedOn { get; set; } = null;
        public DateTime? DueDate { get; set; } = null;
        public string? SortBy { get; set; } = null;
        public bool IsDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
