using ChatBoardAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatBoardAPI.Hubs
{
    public class MessageHub : Hub
    {
       public async Task SendMessage (Message message) 
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
