using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MexQuiz.Models
{
    public class Banner
    {
        public int Id { get; set; }
        public string URL_Banner { get; set; }
        public int Estado { get; set; }
        public List<Banner> items { get; set; }
    }
}