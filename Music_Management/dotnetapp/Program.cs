using dotnetapp.Repository;
using dotnetapp.Services;

var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
            // builder.Services.AddDbContext<ApplicationDbContext>(options =>
            //     options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString")));

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddScoped<MusicRecordRepository>();
        builder.Services.AddScoped<IMusicRecordService,MusicRecordService>();

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin() 
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors(); // This line enables CORS

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    