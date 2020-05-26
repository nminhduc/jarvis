﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System;
using System.Threading;

namespace Infrastructure.Message.Rabbit
{
    public interface IRabbitChannel
    {
        void InitChannel(string name);

        IModel GetChannel();

        RabbitQueueOption GetRabbitQueueOption();
    }

    public class RabbitChannel : IRabbitChannel
    {
        protected readonly RabbitOption _rabbitOptions;
        protected RabbitQueueOption QueueOptions { get; private set; }
        protected IModel Channel { get; private set; }

        private readonly IConfiguration _configuration;

        public RabbitChannel(
            IConfiguration configuration,
            IOptions<RabbitOption> rabbitOptions)
        {
            _configuration = configuration;
            _rabbitOptions = rabbitOptions.Value;
        }

        public void InitChannel(string name)
        {
            QueueOptions = _configuration.GetSection($"RabbitMq:Workers:{name}").Get<RabbitQueueOption>();
            Console.WriteLine($"Config: {JsonConvert.SerializeObject(QueueOptions)}");

            var factory = new ConnectionFactory()
            {
                HostName = _rabbitOptions.HostName,
                UserName = _rabbitOptions.UserName,
                Password = _rabbitOptions.Password,
                Port = _rabbitOptions.Port,
                VirtualHost = _rabbitOptions.VirtualHost,
                DispatchConsumersAsync = true
            };

            var connection = factory.CreateConnection($"{QueueOptions.ConnectionName}_{Thread.CurrentThread.ManagedThreadId}");

            Channel = connection.CreateModel();
        }

        public IModel GetChannel()
        {
            return Channel;
        }

        public RabbitQueueOption GetRabbitQueueOption()
        {
            return QueueOptions;
        }
    }
}