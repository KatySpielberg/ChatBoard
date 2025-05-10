using ChatBoardAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatBoardAPI.Hubs
{
    // SignalR hub for broadcasting messages to all clients
    // Хаб SignalR для рассылки сообщений всем клиентам
    public class MessageHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            try
            {
                await Clients.All.SendAsync("ReceiveMessage", message);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error in SendMessage: {ex.Message}");
            }
        }
    }
}
