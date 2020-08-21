using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MexQuiz.Models
{
    public class LoginRequest
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Paterno { get; set; }
        public string Materno { get; set; }
        public string UserName { get; set; }
        public string Contraseña { get; set; }
        public string Correo { get; set; }
        public string FechadeNacimiento { get; set; }
        public string Sexo { get; set; }
        public string Estado { get; set; }
        public string Municipio { get; set; }
        public bool Estatus { get; set; }
        public int Role { get; set; }
        public int Voto { get; set; }
    }
}