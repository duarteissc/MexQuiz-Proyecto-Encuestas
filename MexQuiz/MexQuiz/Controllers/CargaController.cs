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
    [AllowAnonymous]
    [RoutePrefix("api/load")]
    public class CargaController : ApiController
    {
        /////////////////////////////////////////////////////////////////INDEX
        /// Categorias
        [HttpGet]
        [Route("Categorias")]
        public IHttpActionResult AllCategorias()
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Conexión.PrepararProcedimiento("dbo.sp_getAll");
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<Categoria> _list = new List<Categoria>();
                    while (_dtr.Read())
                    {
                        Categoria _user = new Categoria()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            Nombre = _dtr["Nombre"].ToString()

                        };
                        _list.Add(_user);
                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }
                    return Ok(_list);
                }
                else
                {
                    // throw new Exception("Tipos de Encuestas no Encontrados");
                    return NotFound();
                }


            }
            catch (Exception m)
            {
                //throw new Exception(m.Message);
                return NotFound();
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }

        }
        /// Encuestas
        [HttpGet]
        [Route("Encuestas")]
        public IHttpActionResult ePrioridad(int tipo)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@tipo", tipo));
                _Conexión.PrepararProcedimiento("dbo.sp_getAllbyTipoPrioridad", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<Encuesta> _list = new List<Encuesta>();
                    while (_dtr.Read())
                    {
                        Encuesta _e = new Encuesta()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            Nombre = _dtr["Nombre"].ToString(),
                            Descripcion = _dtr["Descripcion"].ToString(),
                            URL_Documento = _dtr["URL_Documento"].ToString(),
                            URL_Imagen = _dtr["URL_Imagen"].ToString(),
                            Prioridad = int.Parse(_dtr["Prioridad"].ToString()),
                            Tipo = int.Parse(_dtr["Tipo"].ToString())

                        };
                        _list.Add(_e);
                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }
                    return Ok(_list);
                }
                else
                {
                    return NotFound();
                }


            }
            catch (Exception m)
            {
                throw new Exception(m.Message);
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }

        }
        /// Noticias
        [HttpGet]
        [Route("Noticias")]
        public IHttpActionResult nPrioridad(int tipo)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@tipo", tipo));
                _Conexión.PrepararProcedimiento("dbo.sp_getAllbyNewsPrioridad", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<Noticia> _list = new List<Noticia>();
                    while (_dtr.Read())
                    {
                        Noticia _e = new Noticia()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            Nombre = _dtr["Nombre"].ToString(),
                            Descripcion = _dtr["Descripcion"].ToString(),
                            URL_Documento = _dtr["URL_Documento"].ToString(),
                            URL_Imagen = _dtr["URL_Imagen"].ToString(),
                            Prioridad = int.Parse(_dtr["Prioridad"].ToString()),
                            Tipo = int.Parse(_dtr["Tipo"].ToString())

                        };
                        _list.Add(_e);
                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }
                    return Ok(_list);
                }
                else
                {
                    //throw new Exception("Noticias No Encontradas");
                    return NotFound();
                }


            }
            catch (Exception m)
            {
                throw new Exception(m.Message);
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }

        }

        ///////////////////////////////////////////////////////////////Detalles
        ///Encuesta Seleccionada
        [HttpGet]
        [Route("EncuestabyId")]
        public IHttpActionResult encuestabyId(int id)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id",id));
                _Conexión.PrepararProcedimiento("dbo.sp_getbyId", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<Encuesta> _list = new List<Encuesta>();
                    while (_dtr.Read())
                    {
                        Encuesta _e = new Encuesta()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            Nombre = _dtr["Nombre"].ToString(),
                            Descripcion = _dtr["Descripcion"].ToString(),
                            URL_Documento = _dtr["URL_Documento"].ToString(),
                            URL_Imagen = _dtr["URL_Imagen"].ToString(),
                            Prioridad = int.Parse(_dtr["Prioridad"].ToString()),
                            Tipo = int.Parse(_dtr["Tipo"].ToString()),

                        };
                        _list.Add(_e);
                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }
                    return Ok(_list);
                }
                else
                {
                    throw new Exception("Encuesta No Encontrada");
                }


            }
            catch (Exception m)
            {
                throw new Exception(m.Message);
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }

        }
        ///Banners de la Encuesta Seleccionada
        [HttpGet]
        [Route("Banners")]
        public IHttpActionResult banners(int id)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@id", id));
                _Conexión.PrepararProcedimiento("dbo.sp_getbyIdEncuesta", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<Banner> _list = new List<Banner>();
                    while (_dtr.Read())
                    {
                        Banner _e = new Banner()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            URL_Banner = _dtr["URL_Banner"].ToString()

                        };
                        _list.Add(_e);
                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }
                    return Ok(_list);
                }
                else
                {
                    ///throw new Exception("Banners No Encontrados");
                    return NotFound();
                }


            }
            catch (Exception m)
            {
                throw new Exception(m.Message);
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }

        }


        //////////////////////////////////////////////////////////Graficas o Resultados
        ///Obteners Resultados para Graficar by IdEncuestas
        [HttpGet]
        [Route("rGraficasbyidEncuestas")]
        public IHttpActionResult resultados(int id)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@IdEncuesta", id));
                _Conexión.PrepararProcedimiento("dbo.sp_Resultados", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<eResultados> _list = new List<eResultados>();
                    while (_dtr.Read())
                    {
                        
                        eResultados _e = new eResultados()
                        {
                            Afavor = int.Parse(_dtr["Afavor"].ToString()),
                            Encontra = int.Parse(_dtr["Encontra"].ToString()),
                            Nulo = int.Parse(_dtr["Nulo"].ToString()),
                            Total= (int.Parse(_dtr["Afavor"].ToString())+ int.Parse(_dtr["Encontra"].ToString()) +int.Parse(_dtr["Nulo"].ToString()))

                    };
                        _list.Add(_e);
                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }
                    
                    return Ok(_list);
                }
                else
                {
                    throw new Exception("Error de Datos");
                }


            }
            catch (Exception m)
            {
                throw new Exception(m.Message);
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }

        }


        ///Obteners Resultados para Graficar by IdEncuestas
        [HttpGet]
        [Route("S_AEN_H_M_XC")]
        public IHttpActionResult S_AEN_H_M_XC(int id)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Idencuesta", id));
                _Conexión.PrepararProcedimiento("dbo.sp_S_AEN_H_M_XC", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<eResultados> _list = new List<eResultados>();
                    while (_dtr.Read())
                    {

                        eResultados _e = new eResultados()
                        {
                            Afavor = int.Parse(_dtr["Afavor"].ToString()),
                            Encontra = int.Parse(_dtr["Encontra"].ToString()),
                            Nulo = int.Parse(_dtr["Nulo"].ToString()),
                            Total = (int.Parse(_dtr["Afavor"].ToString()) + int.Parse(_dtr["Encontra"].ToString()) + int.Parse(_dtr["Nulo"].ToString()))

                        };
                        _list.Add(_e);
                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }

                    return Ok(_list);
                }
                else
                {
                    return NotFound();
                    ///throw new Exception("Error de Datos");
                }


            }
            catch (Exception m)
            {
                throw new Exception(m.Message);
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }

        }



        //////////////////////////////////////////////////////////////Busqueda
        ///Busqueda de Encuestas
        [HttpPost]
        [Route("BusquedaEncuesta")]
        public IHttpActionResult searchEncuesta(Encuesta encuesta)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@name", encuesta.Nombre));
                _Parametros.Add(new SqlParameter("@tipo", encuesta.Tipo));
                _Conexión.PrepararProcedimiento("dbo.sp_getbyname", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<Encuesta> _list = new List<Encuesta>();
                    while (_dtr.Read())
                    {
                        Encuesta _user = new Encuesta()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            Nombre = _dtr["Nombre"].ToString(),
                            Descripcion = _dtr["Descripcion"].ToString(),
                            URL_Documento = _dtr["URL_Documento"].ToString(),
                            URL_Imagen = _dtr["URL_Imagen"].ToString(),
                            Prioridad = int.Parse(_dtr["Prioridad"].ToString()),
                            Tipo = int.Parse(_dtr["Tipo"].ToString())
                        };
                        _list.Add(_user);
                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }
                    return Ok(_list);
                }
                else
                {
                    //throw new Exception("Estudiante No Encontrado");
                    return NotFound();
                }


            }
            catch (Exception m)
            {
                //throw new Exception(m.Message);
                return NotFound();
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }
            //return "value";
        }
        ///Busqueda de Noticias
        [HttpPost]
        [Route("BusquedaNoticia")]
        public IHttpActionResult searchNoticia(Noticia encuesta)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@name", encuesta.Nombre));
                _Parametros.Add(new SqlParameter("@tipo", encuesta.Tipo));
                _Conexión.PrepararProcedimiento("dbo.sp_getnewsbyname", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<Noticia> _list = new List<Noticia>();
                    while (_dtr.Read())
                    {
                        Noticia _user = new Noticia()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            Nombre = _dtr["Nombre"].ToString(),
                            Descripcion = _dtr["Descripcion"].ToString(),
                            URL_Documento = _dtr["URL_Documento"].ToString(),
                            URL_Imagen = _dtr["URL_Imagen"].ToString(),
                            Prioridad = int.Parse(_dtr["Prioridad"].ToString()),
                            Tipo = int.Parse(_dtr["Tipo"].ToString())
                        };
                        _list.Add(_user);
                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }
                    return Ok(_list);
                }
                else
                {
                    //throw new Exception("Estudiante No Encontrado");
                    return NotFound();
                }


            }
            catch (Exception m)
            {
                //throw new Exception(m.Message);
                return NotFound();
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }
            //return "value";
        }


    }
}
