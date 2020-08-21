using MexQuiz.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MexQuiz.Controllers
{
    [Authorize]
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {   [HttpPost]
        [Route("voto")]
        public IHttpActionResult voto(LoginRequest res)
        {
            int Afavor = 0;
            int Encontra = 0;
            int Nulo = 0;
            if (res.Voto == 1)
            {Afavor = 1;}
            if (res.Voto == 2)
            {Encontra = 1;}
            if (res.Voto == 3)
            { Nulo = 1; }

            SqlConexión _Conexión = new SqlConexión();
            //List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                List<SqlParameter> _Parametros = new List<SqlParameter>();
                DataTableReader _dtr = null;
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@username", res.UserName));
                _Parametros.Add(new SqlParameter("@contraseña", res.Contraseña));
                _Parametros.Add(new SqlParameter("@IdEncuesta", res.Id));
                _Conexión.PrepararProcedimiento("dbo.sp_verVee", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {

                    SqlConexión _Conexión0 = new SqlConexión();
                    _Conexión0.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    List<SqlParameter> _Parametros0 = new List<SqlParameter>();
                    _Parametros0.Add(new SqlParameter("@username", res.UserName));
                    _Parametros0.Add(new SqlParameter("@contraseña", res.Contraseña));
                    _Parametros0.Add(new SqlParameter("@IdEncuesta", res.Id));
                    _Parametros0.Add(new SqlParameter("@af", Afavor));
                    _Parametros0.Add(new SqlParameter("@en", Encontra));
                    _Parametros0.Add(new SqlParameter("@nul", Nulo));
                    _Conexión0.PrepararProcedimiento("sp_puter", _Parametros0);
                    _Conexión0.EjecutarProcedimiento();
                    _Conexión0.Desconectar();
                    _Parametros0.Clear();
                    return Ok();
                }
                else
                {
                    SqlConexión _Conexión1 = new SqlConexión();
                    _Conexión1.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    List<SqlParameter> _Parametros1 = new List<SqlParameter>();
                    _Parametros1.Add(new SqlParameter("@username",res.UserName));
                    _Parametros1.Add(new SqlParameter("@contraseña",res.Contraseña));
                    _Parametros1.Add(new SqlParameter("@IdEncuesta",res.Id));
                    _Parametros1.Add(new SqlParameter("@af",Afavor));
                    _Parametros1.Add(new SqlParameter("@en",Encontra));
                    _Parametros1.Add(new SqlParameter("@nul",Nulo));
                    _Conexión1.PrepararProcedimiento("sp_newve", _Parametros1);
                    _Conexión1.EjecutarProcedimiento();
                    _Conexión1.Desconectar();
                    _Parametros1.Clear();
                    return Ok();
                }
            }
            catch (Exception m)
            {
                throw new Exception(m.Message);
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        
    }
}
