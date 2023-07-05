using Vlims.DocumentManager.Manager;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddScoped<IDocumentManagerService, DocumentManagerService>();
builder.Services.AddScoped<IAdditionalTaskService, AdditionalTaskService>();
builder.Services.AddScoped<IDocumentEffectiveService, DocumentEffectiveService>();
builder.Services.AddScoped<IDocumentPreparationService, DocumentPreparationService>();
builder.Services.AddScoped<IDocumentrequestService, DocumentrequestService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(x =>
{
    x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();