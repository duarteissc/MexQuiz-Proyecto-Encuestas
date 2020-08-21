using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MexQuiz.Models
{
    public class Noticia
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string URL_Documento { get; set; }
        public string URL_Imagen { get; set; }
        public int Prioridad { get; set; }
        public int Tipo { get; set; }
        public int Estado { get; set; }
        public string NombreTipo { get; set; }
    }
}