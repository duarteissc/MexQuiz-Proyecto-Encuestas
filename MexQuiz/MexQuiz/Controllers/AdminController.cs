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
    [RoutePrefix("api/admin")]
    public class AdminController : ApiController
    {
        ///////////////////////////////////////////////////////////////////////////Categorias
        /// Todas las Categorias
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
                    return NotFound();
                    //throw new Exception("Tipos de Encuestas no Encontrados");
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
        /// Categoria x id
        [HttpPost]
        [Route("Categoriasbyid")]
        public IHttpActionResult CategoriabyId(int id)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@id", id));
                _Conexión.PrepararProcedimiento("dbo.sp_getTipobyid", _Parametros);
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
                   /// throw new Exception("Tipos de Encuestas no Encontrados");
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
        ///Nueva Categoria
        [HttpPost]
        [Route("NuevaCategoria")]
        public IHttpActionResult NuevaCategoria(Categoria cat)
        {
            SqlConexión _Conexión = new SqlConexión();
            //List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                List<SqlParameter> _Parametros = new List<SqlParameter>();
                DataTableReader _dtr = null;
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Nombre",cat.Nombre));
                _Conexión.PrepararProcedimiento("dbo.sp_vte", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    _Conexión.Desconectar();
                    _Parametros.Clear();
                    /////////Ya Existe ese Tipo
                    return Unauthorized();
                }
                else
                {
                    SqlConexión _Conexión1 = new SqlConexión();
                    _Conexión1.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    List<SqlParameter> _Parametros1 = new List<SqlParameter>();
                    _Parametros1.Add(new SqlParameter("@Nombre",cat.Nombre));
                    _Conexión1.PrepararProcedimiento("sp_nuevoTipoEncuesta", _Parametros1);
                    _Conexión1.EjecutarProcedimiento();
                    _Conexión1.Desconectar();
                    _Parametros1.Clear();
                    return Ok();
                }


            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///Actualizar Categoria
        [HttpPut]
        [Route("ActualizarCategoria")]
        public IHttpActionResult ActualizarCategoria(Categoria cat)
        {
            SqlConexión _Conexión = new SqlConexión();
            //List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                List<SqlParameter> _Parametros = new List<SqlParameter>();
                DataTableReader _dtr = null;
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Nombre", cat.Nombre));
                _Conexión.PrepararProcedimiento("dbo.sp_vte", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    _Conexión.Desconectar();
                    _Parametros.Clear();
                    /////////Ya Existe ese Tipo
                    return Unauthorized();
                }
                else
                {
                    SqlConexión _Conexión1 = new SqlConexión();
                    _Conexión1.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    List<SqlParameter> _Parametros1 = new List<SqlParameter>();
                    _Parametros1.Add(new SqlParameter("@Id", cat.Id));
                    _Parametros1.Add(new SqlParameter("@Nombre", cat.Nombre));
                    _Conexión1.PrepararProcedimiento("sp_actualizarTipoEncuesta", _Parametros1);
                    _Conexión1.EjecutarProcedimiento();
                    _Conexión1.Desconectar();
                    _Parametros1.Clear();
                    return Ok();
                }


            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///Borrar Categoria
        [HttpDelete]
        [Route("BorrarCategoria")]
        public IHttpActionResult BorrarCategoria(Categoria cat)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                    _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    _Parametros.Add(new SqlParameter("@Id", cat.Id));
                    _Conexión.PrepararProcedimiento("sp_borrarTipoEncuesta", _Parametros);
                    _Conexión.EjecutarProcedimiento();
                    _Conexión.Desconectar();
                    _Parametros.Clear();
                    return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ////////////////////////////////////////////////////////////////////Catalogo de Encuestas
        /// Encuestas de Prioridad x tipo
        [HttpPost]
        [Route("EncuestasPrioridadbyTipo")]
        public IHttpActionResult encuestasPrioridad(int tipo)
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
                    //throw new Exception("Encuestas No Encontradas");
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
        /// Encuesta x id
        [HttpPost]
        [Route("EncuestabyId")]
        public IHttpActionResult encuestabyId(int id)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id", id));
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
        ///Nueva Encuesta
        [HttpPost]
        [Route("NuevaEncuesta")]
        public IHttpActionResult NuevaEncuesta(Encuesta enc)
        {
            SqlConexión _Conexión = new SqlConexión();
            //List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                List<SqlParameter> _Parametros = new List<SqlParameter>();
                DataTableReader _dtr = null;
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@nombre", enc.Nombre));
                _Conexión.PrepararProcedimiento("dbo.sp_ve", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    _Conexión.Desconectar();
                    _Parametros.Clear();
                    /////////Ya Existe ese Tipo
                    return Unauthorized();
                }
                else
                {
                    SqlConexión _Conexión1 = new SqlConexión();
                    _Conexión1.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    List<SqlParameter> _Parametros1 = new List<SqlParameter>();
                    _Parametros1.Add(new SqlParameter("@Nombre",enc.Nombre));
                    _Parametros1.Add(new SqlParameter("@Descripcion", enc.Descripcion));
                    _Parametros1.Add(new SqlParameter("@URL_Documento", enc.URL_Documento));
                    _Parametros1.Add(new SqlParameter("@URL_Imagen", enc.URL_Imagen));
                    _Parametros1.Add(new SqlParameter("@Tipo", enc.NombreTipo));
                    _Conexión1.PrepararProcedimiento("sp_nuevaEncuesta", _Parametros1);
                    _Conexión1.EjecutarProcedimiento();
                    _Conexión1.Desconectar();
                    _Parametros1.Clear();
                    return Ok();
                }


            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///Quitar Prioridad Encuesta
        [HttpPut]
        [Route("QuitarPrioridadEncuesta")]
        public IHttpActionResult QuitarPrioridadEncuesta(Encuesta enc)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id", enc.Id));
                _Conexión.PrepararProcedimiento("sp_quitarPioridad", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///Dar Prioridad Encuesta
        [HttpPut]
        [Route("DarPrioridadEncuesta")]
        public IHttpActionResult DarPrioridadEncuesta(Encuesta enc)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id", enc.Id));
                _Conexión.PrepararProcedimiento("sp_darPioridad", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///Actualizar Nombre de La Encuesta
        [HttpPut]
        [Route("ActualizarNombreEncuesta")]
        public IHttpActionResult ActualizarNombreEncuesta(Encuesta enc)
        {
            SqlConexión _Conexión = new SqlConexión();
            //List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                List<SqlParameter> _Parametros = new List<SqlParameter>();
                DataTableReader _dtr = null;
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@nombre", enc.Nombre));
                _Conexión.PrepararProcedimiento("dbo.sp_ve", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    _Conexión.Desconectar();
                    _Parametros.Clear();
                    /////////Ya Existe ese Nombre
                    return Unauthorized();
                }
                else
                {
                    SqlConexión _Conexión1 = new SqlConexión();
                    _Conexión1.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    List<SqlParameter> _Parametros1 = new List<SqlParameter>();
                    _Parametros1.Add(new SqlParameter("@Id", enc.Id));
                    _Parametros1.Add(new SqlParameter("@Nombre", enc.Nombre));
                    _Conexión1.PrepararProcedimiento("sp_actualizarNombre", _Parametros1);
                    _Conexión1.EjecutarProcedimiento();
                    _Conexión1.Desconectar();
                    _Parametros1.Clear();
                    return Ok();
                }


            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///ActualizarDescripcionEncuesta
        [HttpPut]
        [Route("ActualizarDescripcionEncuesta")]
        public IHttpActionResult ActualizarDescripcionEncuesta(Encuesta enc)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id", enc.Id));
                _Parametros.Add(new SqlParameter("@Descripcion", enc.Descripcion));
                _Conexión.PrepararProcedimiento("sp_actualizarDescripcion", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///ActualizarURLDocumentoEncuesta
        [HttpPut]
        [Route("ActualizarURLDocumentoEncuesta")]
        public IHttpActionResult ActualizarURLDocumentoEncuesta(Encuesta enc)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id", enc.Id));
                _Parametros.Add(new SqlParameter("@URLDocumento", enc.URL_Documento));
                _Conexión.PrepararProcedimiento("sp_actualizarURLDocumento", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///ActualizarURLImagenEncuesta
        [HttpPut]
        [Route("ActualizarURLImagenEncuesta")]
        public IHttpActionResult ActualizarURLImagenEncuesta(Encuesta enc)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id", enc.Id));
                _Parametros.Add(new SqlParameter("@URLImagen", enc.URL_Imagen));
                _Conexión.PrepararProcedimiento("sp_actualizarURLImagen", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///EliminarEncuesta
        [HttpDelete]
        [Route("EliminarEncuesta")]
        public IHttpActionResult EliminarEncuesta(Encuesta enc)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id", enc.Id));
                _Conexión.PrepararProcedimiento("sp_borrarEncuesta", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////Banners
        /// Todos los Banners
        [HttpGet]
        [Route("Banners")]
        public IHttpActionResult AllBanners()
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Conexión.PrepararProcedimiento("dbo.sp_getAllBanners");
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<Banner> _list = new List<Banner>();
                    while (_dtr.Read())
                    {
                        Banner _user = new Banner()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            URL_Banner = _dtr["URL_Banner"].ToString()

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
                    throw new Exception("Banners no Encontrados");
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
        ///Banner x id
        [HttpPost]
        [Route("BannerbyId")]
        public IHttpActionResult BannerbyId(int id)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@id", id));
                _Conexión.PrepararProcedimiento("dbo.sp_getBannerbyId", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    List<Banner> _list = new List<Banner>();
                    while (_dtr.Read())
                    {
                        Banner _user = new Banner()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            URL_Banner = _dtr["URL_Banner"].ToString()

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
                    return NotFound();
                    ///throw new Exception("Banner no Encontrados");
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
        ///Banner x idEncuesta
        [HttpPost]
        [Route("BannerbyIdEncuesta")]
        public IHttpActionResult BannerbyIdEncuesta(int id)
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
                        Banner _user = new Banner()
                        {
                            Id = int.Parse(_dtr["Id"].ToString()),
                            URL_Banner = _dtr["URL_Banner"].ToString()

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
                    return NotFound();
                   /// throw new Exception("Banners no Encontrados");
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
        ///Nuevos Banners 3 max
        [HttpPost]
        [Route("NuevosBanners")]
        public void NuevosBanners(Banner items)
        {
            SqlConexión _Conexión = new SqlConexión();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                
                    List<SqlParameter> _Parametros = new List<SqlParameter>();
                    _Parametros.Add(new SqlParameter("@idEncuesta", items.Id));
                    _Parametros.Add(new SqlParameter("@url_Banner", items.URL_Banner));
                    _Conexión.PrepararProcedimiento("sp_nuevoBanner", _Parametros);
                    _Conexión.EjecutarProcedimiento();
                    _Parametros.Clear();

                
                _Conexión.Desconectar();

            }
            catch (Exception m)
            {
                throw new Exception(m.Message);
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///ActualizarURLBanner
        [HttpPut]
        [Route("ActualizarURLBanner")]
        public IHttpActionResult ActualizarURLBanner(Banner b)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@id", b.Id));
                _Parametros.Add(new SqlParameter("@url_Banner",b.URL_Banner));
                _Conexión.PrepararProcedimiento("sp_actualizarBanner", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///BorrarBanner
        [HttpDelete]
        [Route("BorrarBanner")]
        public IHttpActionResult BorrarBanner(Banner b)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@id", b.Id));
                _Conexión.PrepararProcedimiento("sp_borrarBanner", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////Noticias
        ///Noticias de Prioridad x tipo
        [HttpGet]
        [Route("NoticiasPrioridadbyTipo")]
        public IHttpActionResult noticiaPrioridad(int tipo)
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
                    throw new Exception("Noticias No Encontradas");
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
        /// Noticia x id
        [HttpGet]
        [Route("NoticiabyId")]
        public IHttpActionResult noticiabyId(int id)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id", id));
                _Conexión.PrepararProcedimiento("dbo.sp_getnewbyId", _Parametros);
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
        ///Nueva Noticia
        [HttpPost]
        [Route("NuevaNoticia")]
        public IHttpActionResult NuevaNoticia(Noticia not)
        {
            SqlConexión _Conexión = new SqlConexión();
            try
            {
                List<SqlParameter> _Parametros = new List<SqlParameter>();
                DataTableReader _dtr = null;
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@nombre",not.Nombre));
                _Conexión.PrepararProcedimiento("dbo.sp_vnew", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    _Conexión.Desconectar();
                    _Parametros.Clear();
                    /////////Ya Existe ese Nombre de Noticia
                    return Unauthorized();
                }
                else
                {
                    SqlConexión _Conexión1 = new SqlConexión();
                    _Conexión1.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    List<SqlParameter> _Parametros1 = new List<SqlParameter>();
                    _Parametros1.Add(new SqlParameter("@Nombre",not.Nombre));
                    _Parametros1.Add(new SqlParameter("@Descripcion",not.Descripcion));
                    _Parametros1.Add(new SqlParameter("@URL_Documento",not.URL_Documento));
                    _Parametros1.Add(new SqlParameter("@URL_Imagen", not.URL_Imagen));
                    _Parametros1.Add(new SqlParameter("@Tipo", not.NombreTipo));
                    _Conexión1.PrepararProcedimiento("sp_nuevaNoticia", _Parametros1);
                    _Conexión1.EjecutarProcedimiento();
                    _Conexión1.Desconectar();
                    _Parametros1.Clear();
                    return Ok();
                }


            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///Quitar Prioridad Noticia
        [HttpPut]
        [Route("QuitarPrioridadNoticia")]
        public IHttpActionResult QuitarPrioridadNoticia(Noticia not)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id",not.Id));
                _Conexión.PrepararProcedimiento("sp_quitarPioridadNoticia", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///Dar Prioridad Noticia
        [HttpPut]
        [Route("DarPrioridadNoticia")]
        public IHttpActionResult DarPrioridadNoticia(Noticia not)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id",not.Id));
                _Conexión.PrepararProcedimiento("sp_darPioridadNoticia", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///Actualizar Nombre de La Noticia
        [HttpPut]
        [Route("ActualizarNombreNoticia")]
        public IHttpActionResult ActualizarNombreNoticia(Noticia not)
        {
            SqlConexión _Conexión = new SqlConexión();
            //List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                List<SqlParameter> _Parametros = new List<SqlParameter>();
                DataTableReader _dtr = null;
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@nombre",not.Nombre));
                _Conexión.PrepararProcedimiento("dbo.sp_vnew", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    _Conexión.Desconectar();
                    _Parametros.Clear();
                    /////////Ya Existe ese Nombre de Noticia
                    return Unauthorized();
                }
                else
                {
                    SqlConexión _Conexión1 = new SqlConexión();
                    _Conexión1.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    List<SqlParameter> _Parametros1 = new List<SqlParameter>();
                    _Parametros1.Add(new SqlParameter("@Id",not.Id));
                    _Parametros1.Add(new SqlParameter("@Nombre",not.Nombre));
                    _Conexión1.PrepararProcedimiento("sp_actualizarNombreNoticia", _Parametros1);
                    _Conexión1.EjecutarProcedimiento();
                    _Conexión1.Desconectar();
                    _Parametros1.Clear();
                    return Ok();
                }


            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///ActualizarDescripcionNoticia
        [HttpPut]
        [Route("ActualizarDescripcionNoticia")]
        public IHttpActionResult ActualizarDescripcionNoticia(Noticia not)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id",not.Id));
                _Parametros.Add(new SqlParameter("@Descripcion",not.Descripcion));
                _Conexión.PrepararProcedimiento("sp_actualizarDescripcionNoticia", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///ActualizarURLDocumentoNoticia
        [HttpPut]
        [Route("ActualizarURLDocumentoNoticia")]
        public IHttpActionResult ActualizarURLDocumentoNoticia(Noticia not)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id",not.Id));
                _Parametros.Add(new SqlParameter("@URLDocumento",not.Descripcion));
                _Conexión.PrepararProcedimiento("sp_actualizarURLDocumentoNoticia", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///ActualizarURLImagenNoticia
        [HttpPut]
        [Route("ActualizarURLImagenNoticia")]
        public IHttpActionResult ActualizarURLImagenNoticia(Noticia not)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id",not.Id));
                _Parametros.Add(new SqlParameter("@URLImagen",not.Descripcion));
                _Conexión.PrepararProcedimiento("sp_actualizarURLImagenNoticia", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        ///EliminarNoticia
        [HttpDelete]
        [Route("EliminarNoticia")]
        public IHttpActionResult EliminarNoticia(Noticia not)
        {
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Id",not.Id));
                _Conexión.PrepararProcedimiento("sp_borrarEncuestaNoticia", _Parametros);
                _Conexión.EjecutarProcedimiento();
                _Conexión.Desconectar();
                _Parametros.Clear();
                return Ok();
            }
            catch (Exception m)
            {
                return Unauthorized();

            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
            }
        }
        /////////////////////////////////////////////////////////////////////////////Resultados o Graficas
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
                            Nulo = int.Parse(_dtr["Nulo"].ToString())

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

    }
}
