using GameStore.Data;
using GameStore.EndPoints;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddValidation();

builder.AddGameStoreDb();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();
app.UseCors("AllowAll");
app.MapGameEndPoints();
app.MapGenresEndpoints();
app.MigrateDb();


app.Run();
