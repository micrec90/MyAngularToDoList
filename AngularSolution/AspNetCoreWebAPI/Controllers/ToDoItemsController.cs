using AspNetCoreWebAPI.Context;
using AspNetCoreWebAPI.DTOs;
using AspNetCoreWebAPI.Interfaces;
using AspNetCoreWebAPI.Mappers;
using AspNetCoreWebAPI.Models;
using AspNetCoreWebAPI.Queries;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemsController : Controller
    {
        private readonly IToDoItemsRepository _toDoItemsRepository;
        private readonly ApplicationDBContext _context;
        public ToDoItemsController(ApplicationDBContext context, IToDoItemsRepository toDoItemsRepository)
        {
            _toDoItemsRepository = toDoItemsRepository;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItemGetDTO>>> GetToDoItems([FromQuery] ToDoItemQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var toDoItems = await _toDoItemsRepository.GetAllAsync(queryObject);
            return toDoItems.Select(x => x.ToToDoItemGetDTO()).ToList();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ToDoItemGetDTO>> GetToDoItem(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var toDoItem = await _toDoItemsRepository.GetByIdAsync(id);

            if (toDoItem == null)
            {
                return NotFound();
            }

            return toDoItem.ToToDoItemGetDTO();
        }
        [HttpPatch("{id:int}")]
        public async Task<IActionResult> PatchToDoItem(int id, ToDoItemPatchDTO toDoItemPatchDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var toDoItem = await _toDoItemsRepository.PatchAsync(id, toDoItemPatchDTO);

            if (toDoItem == null)
            {
                return NotFound();
            }

            if (id != toDoItem.Id)
            {
                return BadRequest();
            }

            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<ToDoItem>> PostToDoItem(ToDoItemPostDTO toDoItemPostDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var toDoItem = toDoItemPostDTO.ToToDoItemFromPostDTO();
            await _toDoItemsRepository.PostAsync(toDoItem);

            return CreatedAtAction(nameof(GetToDoItem), new { id = toDoItem.Id }, toDoItem.ToToDoItemGetDTO());
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteToDoItem(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var toDoItem = await _toDoItemsRepository.DeleteAsync(id);
            if (toDoItem == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
