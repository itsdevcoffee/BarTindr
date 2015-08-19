﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BarTindr.Models.ViewModel
{
    public class LocationViewModel
    {
        public int LocationId { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public int ZipCode { get; set; }
        public string Country { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public bool IsActive { get; set; }
    }
}