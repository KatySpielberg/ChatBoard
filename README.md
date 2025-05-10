# ChatBoard

**ChatBoard** is a simple full-stack real-time chat application built using **.NET 6** for the backend and **Angular** for the frontend. It utilizes **SignalR** for real-time message updates and CRUD functionality.

## Technologies

- **Frontend**: Angular 16 (with SignalR client)
- **Backend**: .NET 6 Web API (with SignalR hub)
- **Database**: In-memory data store (temporary)

## Features

- Send and receive messages in real-time via SignalR
- Create, delete messages via the backend
- Real-time updates for all connected clients
- CORS setup for Angular to connect with the backend

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ChatBoard.git

### **Backend (API)**
2. Navigate to the ChatBoardAPI folder and restore dependencies: 
   cd ChatBoardAPI
   dotnet restore  
3. Run the backend API: 
   dotnet run
### **Frontend (Angular)**
4. Navigate to the ChatBoardClient folder and install dependencies:
   cd ChatBoardClient
   npm install
5. Run the frontend Angular application:
   ng serve
6. Open your browser and go to http://localhost:4200 to access the app

#  How SignalR Works in this App
## Backend (SignalR Hub):
The backend exposes a SignalR Hub (defined in MessageHub.cs).
When a client sends a message, it broadcasts that message to all connected clients via the hub.

## Frontend (Angular):
The Angular app connects to the SignalR hub using the @microsoft/signalr client.
When a message is received from the backend, it is automatically displayed in the UI.
The frontend listens to the ReceiveMessage event and updates the UI accordingly.

### Checking WebSocket Connection
- Open the Developer Tools in your browser (F12).
- Go to the Network tab and filter for WS (WebSocket).
- Refresh the page.
- You should see a connection to messageHub and the status should be 101 Switching Protocols.
- In the Messages tab, you should see real-time messages as they come in.
