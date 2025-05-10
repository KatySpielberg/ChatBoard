using ChatBoardAPI.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Register SignalR services
// Регистрируем сервис SignalR
builder.Services.AddSignalR();

// Enable CORS for Angular frontend
// Разрешаем CORS для фронтенда на Angular (http://localhost:4200)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    policy.AllowAnyHeader()
          .AllowAnyMethod()     
          .AllowCredentials()
          .WithOrigins("http://localhost:4200"));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable CORS
// Подключаем CORS
app.UseCors();

app.UseRouting();
app.UseAuthorization();

// Register REST API endpoints
// Регистрируем REST контроллеры
app.MapControllers();
app.MapHub<MessageHub>("/messageHub");

app.Run();
