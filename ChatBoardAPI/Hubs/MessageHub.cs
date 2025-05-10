using ChatBoardAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatBoardAPI.Hubs
{
    // SignalR hub for broadcasting messages to all clients
    // Хаб SignalR для рассылки сообщений всем клиентам
    public class MessageHub : Hub
    {
       public async Task SendMessage (Message message) 
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
