using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using TalkBack.BLL.Interfaces;
using TalkBack.BLL.Services;
using TalkBack.DAL.Interfaces;
using TalkBack.DAL.Models;
using TalkBack.DAL.Repositories;
using TalkBack.UI.Hubs;

namespace TalkBack.UI
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            services.AddSingleton<IDictionary<string, string>>(options => new Dictionary<string, string>());

            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<IChatRepository, ChatRepository>();

            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<IChatService, ChatService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<MainHub>("/main");
            });
        }
    }
}
