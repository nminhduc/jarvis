﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Message.Rabbit
{
    public class RabbitRpcResponseModel<T>
    {
        public bool Succeeded { get; set; }
        public Exception Exception { get; set; }
        public T Data { get; set; }
    }
}
