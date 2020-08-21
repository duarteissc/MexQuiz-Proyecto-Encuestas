using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MexQuiz.Models
{
    public class eResultados
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public int IdEncuesta { get; set; }
        public int Afavor { get; set; }
        public int Encontra { get; set; }
        public int Nulo { get; set; }
        public int Estado { get; set; }
        public int Total { get; set; }
    }
}