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
        // In-memory message store
        // Хранилище сообщений в оперативной памяти
        private static List<Message> _messages = new();
        private readonly IHubContext<MessageHub> _hubContext;

        public MessagesController(IHubContext<MessageHub> hubContext)
        {
            _hubContext = hubContext;
        }

        // GET: api/messages
        // Получить все сообщения
        [HttpGet]
        public IActionResult GetAll() => Ok(_messages);

        // POST: api/messages
        // Добавить сообщение и отправить его всем через SignalR
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Message message)
        {
            try
            {
                message.Id = _messages.Count + 1;
                _messages.Add(message);

                // Notify all clients through SignalR
                // Уведомление всех клиентов через SignalR
                await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
                return Ok();
            }
            catch (Exception ex)
            {
                // Log exception and return an error response
                Console.Error.WriteLine($"Error in Post: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/messages/{id}
        // Удалить сообщение по ID
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var msg = _messages.FirstOrDefault(m => m.Id == id);
            if (msg == null) return NotFound();

            _messages.Remove(msg);
            return NoContent(); // 204
        }

    }
}
