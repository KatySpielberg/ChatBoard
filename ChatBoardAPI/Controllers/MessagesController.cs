using ChatBoardAPI.Hubs;
using ChatBoardAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ChatBoardAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : Controller
    {
        private static List<Message> _messages = new();
        private readonly IHubContext<MessageHub> _hubContext;

        public MessagesController(IHubContext<MessageHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_messages);

        [HttpPost]
        public async Task <IActionResult> Post([FromBody] Message message) 
        {
            message.Id = _messages.Count + 1;
            _messages.Add(message);

            await _hubContext.Clients.All.SendAsync("ReceivedMessage", message);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var msg = _messages.FirstOrDefault(m => m.Id == id);
            if (msg == null) return NotFound();

            _messages.Remove(msg);
            return NoContent();
        }

    }
}
