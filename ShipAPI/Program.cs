using GraphQL;
using GraphQL.Types;
using ShipAPI.GraphQL;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Register the GraphQL schema and types
builder.Services.AddSingleton<ShipQuery>();
builder.Services.AddSingleton<ShipType>();
builder.Services.AddSingleton<ISchema, ShipSchema>();
builder.Services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
//builder.Services.AddSingleton<ShipSchema>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin();
            builder.AllowAnyMethod();
            builder.AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
