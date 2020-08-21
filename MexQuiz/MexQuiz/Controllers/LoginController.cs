using MexQuiz.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading;
using System.Web.Http;

namespace MexQuiz.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("echouser")]
        public IHttpActionResult EchoUser()
        {
            var identity = Thread.CurrentPrincipal.Identity;
            return Ok($"IPrincipal-user:{identity.Name}-IsAuthenticad{identity.IsAuthenticated}");
        }
        ///Login
        [HttpPost]
        [Route("authenticate")]
        public IHttpActionResult Authenticate(LoginRequest login)
        {
            UserController n = new UserController();
            if (login == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            
            LoginRequest datos= IniciarSesion(login);
            bool isCredentialValid = datos.Estatus;
            if (isCredentialValid)
            {

                var token = TokenGenerator.GenerateTokenJwt(datos.UserName,datos.Contraseña,datos.Correo,datos.Role);
                return Ok(token);
            }
            else
            {
                return Unauthorized();

            }

        }
        /// Registrar Nuevo Usuario
        [HttpPost]
        [Route("register")]
        public IHttpActionResult Registrar(LoginRequest user)
        {
            SqlConexión _Conexión = new SqlConexión();
            //List<SqlParameter> _Parametros = new List<SqlParameter>();
            try
            {
                List<SqlParameter> _Parametros = new List<SqlParameter>();
                DataTableReader _dtr = null;
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Username", user.UserName));
                _Conexión.PrepararProcedimiento("dbo.sp_Nick", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    _Conexión.Desconectar();
                    _Parametros.Clear();
                    /////////Ya Existe ese Nick
                    return Unauthorized();
                }
                else
                {
                    SqlConexión _Conexión1 = new SqlConexión();
                    _Conexión1.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    List<SqlParameter> _Parametros1 = new List<SqlParameter>();
                    _Parametros1.Add(new SqlParameter("@Nombre", user.Nombre));
                    _Parametros1.Add(new SqlParameter("@Paterno", user.Paterno));
                    _Parametros1.Add(new SqlParameter("@Materno", user.Materno));
                    _Parametros1.Add(new SqlParameter("@Username", user.UserName));
                    _Parametros1.Add(new SqlParameter("@Contraseña", user.Contraseña));
                    _Parametros1.Add(new SqlParameter("@Correo", user.Correo));
                    _Parametros1.Add(new SqlParameter("@fdn", user.FechadeNacimiento));
                    _Parametros1.Add(new SqlParameter("@Sexo", user.Sexo));
                    _Parametros1.Add(new SqlParameter("@Estado", user.Estado));
                    _Parametros1.Add(new SqlParameter("@Municipio", user.Municipio));
                    _Conexión1.PrepararProcedimiento("sp_Registrar", _Parametros1);
                    _Conexión1.EjecutarProcedimiento();
                    var token = TokenGenerator.GenerateTokenJwt(user.UserName, user.Contraseña,user.Correo,0);
                    _Conexión1.Desconectar();
                    _Parametros1.Clear();
                    SendEmailWelcome(user.Correo,user.Nombre);
                    return Ok(token);
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
        /// Actualizar Contraseña Usuario
        [HttpPut]
        [Route("UpdatePassword")]
        public IHttpActionResult ActualizarContraseñaUser(LoginRequest user)
        {
            SqlConexión _Conexión = new SqlConexión();
            try
            {
                List<SqlParameter> _Parametros = new List<SqlParameter>();
                DataTableReader _dtr = null;
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Username", user.UserName));
                _Parametros.Add(new SqlParameter("@Correo", user.Correo));
                _Conexión.PrepararProcedimiento("dbo.sp_IdNickEmail", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    DataTableReader _dtr1 = null;
                    SqlConexión _Conexión1 = new SqlConexión();
                    List<SqlParameter> _Parametrost = new List<SqlParameter>();
                    _Conexión1.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                    _Parametrost.Add(new SqlParameter("@Username", user.UserName));
                    _Parametrost.Add(new SqlParameter("@Correo", user.Correo));
                    _Parametrost.Add(new SqlParameter("@Password_New", user.Contraseña));
                    _Conexión1.PrepararProcedimiento("sp_UpdatePassword", _Parametrost);
                    _dtr1 = _Conexión1.EjecutarTableReader();
                    long id = 0;
                    if (_dtr1.HasRows)
                    {
                        while (_dtr1.Read())
                        {
                            LoginRequest _user = new LoginRequest()
                            {
                                Id = int.Parse(_dtr1["Id"].ToString())
                            };

                            id = _user.Id;
                        }
                        if (!_dtr1.IsClosed)
                        {
                            _dtr1.Close();
                        }
                        _Conexión1.Desconectar();
                        _Parametrost.Clear();
                        SendEmailPassword(user.Correo, user.Nombre,user.UserName);
                        return Ok(id);
                    }
                    else
                    {
                        _Conexión1.Desconectar();
                        _Parametrost.Clear();
                        return NotFound();
                    }

                }
                else
                {
                    _Conexión.Desconectar();
                    _Parametros.Clear();
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
            }
        }

        public LoginRequest IniciarSesion(LoginRequest user)
        {
            LoginRequest _user = new LoginRequest();
            SqlConexión _Conexión = new SqlConexión();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            try
            {
                _Conexión.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MQ"].ToString());
                _Parametros.Add(new SqlParameter("@Username", user.UserName));
                _Parametros.Add(new SqlParameter("@Contraseña", user.Contraseña));
                _Conexión.PrepararProcedimiento("sp_Login", _Parametros);
                _dtr = _Conexión.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    while (_dtr.Read())
                    {

                        _user.Id = int.Parse(_dtr["Id"].ToString());
                        _user.UserName =(_dtr["Username"].ToString());
                        _user.Contraseña =(_dtr["Contraseña"].ToString());
                        _user.Correo = (_dtr["Correo"].ToString());
                        _user.Role = int.Parse(_dtr["_Role"].ToString());
                        _user.Estatus=true;

                    }
                    if (!_dtr.IsClosed)
                    {
                        _dtr.Close();
                    }
                    _Conexión.Desconectar();
                    _Parametros.Clear();
                    return _user;
                }
                else
                {
                    
                    _user.Estatus = false;
                    return _user;

                }


            }
            catch (Exception m)
            {
                _user.Estatus = false;
                return _user;
                //throw new Exception(m.Message);
                //throw new Exception(m.Message);
            }
            finally
            {
                _Conexión.Desconectar();
                _Conexión = null;
                _dtr = null;
            }
        }

        public void SendEmailWelcome(string Receptor, string name)
        {
            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("mexquiz@gmail.com", "mexQuiz2018");
            MailMessage mail = new MailMessage("mexquiz@gmail.com", Receptor); //Corrreo destino);
            client.Host = "smtp.gmail.com";
            mail.Subject = "Bienvenido | MexQuiz";
            string html = "<html xmlns='http://www.w3.org/1999/xhtml'> <head> <meta http-equiv='content-type' content='text/html; charset=utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1.0;'> <meta name='format-detection' content='telephone=no'/> <style> /* Reset styles */ body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;} body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; } img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } #outlook a { padding: 0; } .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } /* Extra floater space for advanced mail clients only */ @media all and (max-width: 600px) { .floater { width: 320px; } } /* Set color for auto links (addresses, dates, etc.) */ a, a:hover { color: #127DB3; } .footer a, .footer a:hover { color: #999999; } </style> </head> <!-- BODY --> <!-- Set message background color (twice) and text color (twice) --> <body topmargin='0' rightmargin='0' bottommargin='0' leftmargin='0' marginwidth='0' marginheight='0' width='100%' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; background-color: #FFFFFF; color: #000000;' bgcolor='#FFFFFF' text='#000000'> <!-- SECTION / BACKGROUND --> <!-- Set section background color --> <table width='100%' align='center' border='0' cellpadding='0' cellspacing='0' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;' class='background'><tr><td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;' bgcolor='#127DB3'> <!-- WRAPPER --> <!-- Set wrapper width (twice) --> <table border='0' cellpadding='0' cellspacing='0' align='center' width='600' style='border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit; max-width: 600px;' class='wrapper'> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; padding-top: 20px;'> <!-- PREHEADER --> <!-- Set text color to background color --> <div style='display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0; color: #FFFFFF;' class='preheader'> </div> <a target='_blank' style='text-decoration: none;' href='#'> <img border='0' vspace='0' hspace='0' src='https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1GWbSipEOD0XB2jvs5miLU6VpfDgmfBe3' width='100' height='100' alt='Logo' title='Logo' style=' color: #000000; font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;' /></a> </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%; padding-top: 20px; color: #FFFFFF; font-family: sans-serif;' class='header'> Bienvenid@ </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%; padding-top: 5px; color: #FFFFFF; font-family: sans-serif;' class='subheader'> '" + name + "' </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-top: 20px;' class='hero'><a target='_blank' style='text-decoration: none;' href='#'><img border='0' vspace='0' hspace='0' src='https://drive.google.com/uc?export=download&confirm=no_antivirus&id=17N0Y1MhVnGdwHslkO-7fa3BXoP6NFDnT' alt='Please enable images to view this content' title='Hero Image' width='530' style=' width: 88.33%; max-width: 530px; color: #FFFFFF; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;'/></a></td> </tr> <!-- PARAGRAPH --> <!-- Set text color and font family ('sans-serif' or 'Georgia, serif'). Duplicate all text styles in links, including line-height --> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%; padding-top: 25px; color: #FFFFFF; font-family: sans-serif;' class='paragraph'> Esperamos que la información que hemos preparado para usted sea de relevancia y fácil de consultar, así como sencilla de relacionar con nuestros otros sitios web, en términos de funcionalidad e imagen. ¡Échele un vistazo, estamos seguros de que encontrará lo que está buscando!. </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; padding-top: 25px; padding-bottom: 35px;' class='button'><a href='https://github.com/konsav/email-templates/' target='_blank' style='text-decoration: underline;'> <table border='0' cellpadding='0' cellspacing='0' align='center' style='max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;'><tr><td align='center' valign='middle' style='padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;' bgcolor='#0B5073'><a target='_blank' style='text-decoration: underline; color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;' href='https://www.google.com.mx/'> Entrar </a> </td></tr></table></a> </td> </tr> <!-- End of WRAPPER --> </table> <!-- SECTION / BACKGROUND --> <!-- Set section background color --> </td></tr><tr><td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-top: 5px;' bgcolor='#FFFFFF'> <!-- SECTION / BACKGROUND --> <!-- Set section background color --> </td></tr><tr><td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;' bgcolor='#F0F0F0'> <!-- WRAPPER --> <!-- Set wrapper width (twice) --> <table border='0' cellpadding='0' cellspacing='0' align='center' width='600' style='border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit; max-width: 600px;' class='wrapper'> <!-- SOCIAL NETWORKS --> <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 --> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; padding-top: 25px;' class='social-icons'><table width='256' border='0' cellpadding='0' cellspacing='0' align='center' style='border-collapse: collapse; border-spacing: 0; padding: 0;'> <tr> <!-- ICON 1 --> <td align='center' valign='middle' style='margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;'><a target='_blank' href='#' style='text-decoration: none;'><img border='0' vspace='0' hspace='0' style='padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block; color: #000000;' alt='F' title='Facebook' width='44' height='44' src='https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/facebook.png'></a></td> <!-- ICON 2 --> <td align='center' valign='middle' style='margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;'><a target='_blank' href='#' style='text-decoration: none;'><img border='0' vspace='0' hspace='0' style='padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block; color: #000000;' alt='T' title='Twitter' width='44' height='44' src='https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/twitter.png'></a></td> <!-- ICON 3 --> <td align='center' valign='middle' style='margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;'><a target='_blank' href='#' style='text-decoration: none;'><img border='0' vspace='0' hspace='0' style='padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block; color: #000000;' alt='G' title='Google Plus' width='44' height='44' src='https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/googleplus.png'></a></td> </tr> </table> </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%; padding-top: 20px; padding-bottom: 20px; color: #999999; font-family: sans-serif;' class='footer'> Esta plantilla de correo electrónico fue enviada porque queremos hacer del mundo un lugar mejor. Puede cambiar la configuración de su suscripción en cualquier momento. <img width='1' height='1' border='0' vspace='0' hspace='0' style='margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;' src='https://raw.githubusercontent.com/konsav/email-templates/master/images/tracker.png' /> </td> </tr> </table> </td></tr></table> </body> </html>';";
                //string html = "<h2>" + name + "</h2>" +
            //  "<img src='cid:imagen' />";
            AlternateView plainView = AlternateView.CreateAlternateViewFromString(html, Encoding.UTF8, MediaTypeNames.Text.Plain);/////Texto de mas
            AlternateView htmlView = AlternateView.CreateAlternateViewFromString(html, Encoding.UTF8, MediaTypeNames.Text.Html);
            //LinkedResource top = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\top-shadow-basica.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource cabecera = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\cabecera-basica.jpg", MediaTypeNames.Image.Jpeg);
            //LinkedResource shadow = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\shadow-basica.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource producto = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\producto.jpg", MediaTypeNames.Image.Jpeg);
            //LinkedResource t = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\twitter.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource f = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\facebook.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource s = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\shadow-basica.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource boton = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\boton.jpg", MediaTypeNames.Image.Jpeg);

            //top.ContentId = "top";
            //cabecera.ContentId = "cabecera";
            //shadow.ContentId = "shadow";
            //t.ContentId = "t";
            //f.ContentId = "f";
            //s.ContentId = "s";
            //producto.ContentId = "producto";
            //boton.ContentId = "boton";
            //htmlView.LinkedResources.Add(top);
            //htmlView.LinkedResources.Add(cabecera);
            //htmlView.LinkedResources.Add(shadow);
            //htmlView.LinkedResources.Add(t);
            //htmlView.LinkedResources.Add(f);
            //htmlView.LinkedResources.Add(producto);
            //htmlView.LinkedResources.Add(s);
            //htmlView.LinkedResources.Add(boton);
            mail.AlternateViews.Add(plainView);
            mail.AlternateViews.Add(htmlView);
            client.Send(mail);
        }

        public void SendEmailPassword(string Receptor, string pass,string name)
        {
            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("mexquiz@gmail.com", "mexQuiz2018");
            MailMessage mail = new MailMessage("elobservador.bjx@gmail.com", Receptor); //Corrreo destino);
            client.Host = "smtp.gmail.com";
            mail.Subject = "Recuperar Contraseña | MexQuiz";
            string html = "<html xmlns='http://www.w3.org/1999/xhtml'> <head> <meta http-equiv='content-type' content='text/html; charset=utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1.0;'> <meta name='format-detection' content='telephone=no'/> <style> /* Reset styles */ body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;} body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; } img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } #outlook a { padding: 0; } .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } /* Extra floater space for advanced mail clients only */ @media all and (max-width: 600px) { .floater { width: 320px; } } /* Set color for auto links (addresses, dates, etc.) */ a, a:hover { color: #127DB3; } .footer a, .footer a:hover { color: #999999; } </style> </head> <!-- BODY --> <!-- Set message background color (twice) and text color (twice) --> <body topmargin='0' rightmargin='0' bottommargin='0' leftmargin='0' marginwidth='0' marginheight='0' width='100%' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; background-color: #FFFFFF; color: #000000;' bgcolor='#FFFFFF' text='#000000'> <!-- SECTION / BACKGROUND --> <!-- Set section background color --> <table width='100%' align='center' border='0' cellpadding='0' cellspacing='0' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;' class='background'><tr><td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;' bgcolor='#127DB3'> <!-- WRAPPER --> <!-- Set wrapper width (twice) --> <table border='0' cellpadding='0' cellspacing='0' align='center' width='600' style='border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit; max-width: 600px;' class='wrapper'> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; padding-top: 20px;'> <!-- PREHEADER --> <!-- Set text color to background color --> <div style='display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0; color: #FFFFFF;' class='preheader'> </div> <a target='_blank' style='text-decoration: none;' href='#'> <img border='0' vspace='0' hspace='0' src='https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1GWbSipEOD0XB2jvs5miLU6VpfDgmfBe3' width='100' height='100' alt='Logo' title='Logo' style=' color: #000000; font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;' /></a> </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%; padding-top: 20px; color: #FFFFFF; font-family: sans-serif;' class='header'> Hola </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%; padding-top: 5px; color: #FFFFFF; font-family: sans-serif;' class='subheader'> '" + name + "' </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%; padding-top: 25px; color: #FFFFFF; font-family: sans-serif;' class='paragraph'> La Contraseña ha sido restablecida </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%; padding-top: 25px; color: #FFFFFF; font-family: sans-serif;' class='paragraph'> Su Contraseña Ahora es: </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%; padding-top: 25px; color: #FFFFFF; font-family: sans-serif;' class='paragraph'> '"+pass+ "'</td> </tr> <!-- End of WRAPPER --> </table> <!-- SECTION / BACKGROUND --> <!-- Set section background color --> </td></tr><tr><td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-top: 5px;' bgcolor='#FFFFFF'> <!-- SECTION / BACKGROUND --> <!-- Set section background color --> </td></tr><tr><td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;' bgcolor='#F0F0F0'> <!-- WRAPPER --> <!-- Set wrapper width (twice) --> <table border='0' cellpadding='0' cellspacing='0' align='center' width='600' style='border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit; max-width: 600px;' class='wrapper'> <!-- SOCIAL NETWORKS --> <!-- Image text color should be opposite to background color. Set your url, image src, alt and title. Alt text should fit the image size. Real image size should be x2 --> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; padding-top: 25px;' class='social-icons'><table width='256' border='0' cellpadding='0' cellspacing='0' align='center' style='border-collapse: collapse; border-spacing: 0; padding: 0;'> <tr> <!-- ICON 1 --> <td align='center' valign='middle' style='margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;'><a target='_blank' href='#' style='text-decoration: none;'><img border='0' vspace='0' hspace='0' style='padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block; color: #000000;' alt='F' title='Facebook' width='44' height='44' src='https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/facebook.png'></a></td> <!-- ICON 2 --> <td align='center' valign='middle' style='margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;'><a target='_blank' href='#' style='text-decoration: none;'><img border='0' vspace='0' hspace='0' style='padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block; color: #000000;' alt='T' title='Twitter' width='44' height='44' src='https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/twitter.png'></a></td> <!-- ICON 3 --> <td align='center' valign='middle' style='margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;'><a target='_blank' href='#' style='text-decoration: none;'><img border='0' vspace='0' hspace='0' style='padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block; color: #000000;' alt='G' title='Google Plus' width='44' height='44' src='https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/googleplus.png'></a></td> </tr> </table> </td> </tr> <tr> <td align='center' valign='top' style='border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%; padding-top: 20px; padding-bottom: 20px; color: #999999; font-family: sans-serif;' class='footer'> Esta plantilla de correo electrónico fue enviada porque queremos hacer del mundo un lugar mejor. Puede cambiar la configuración de su suscripción en cualquier momento. <img width='1' height='1' border='0' vspace='0' hspace='0' style='margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;' src='https://raw.githubusercontent.com/konsav/email-templates/master/images/tracker.png' /> </td> </tr> </table> </td></tr></table> </body> </html>';";
                //string html = "<h2>" + name + "</h2>" +
            //  "<img src='cid:imagen' />";
            AlternateView plainView = AlternateView.CreateAlternateViewFromString(html, Encoding.UTF8, MediaTypeNames.Text.Plain);/////Texto de mas
            AlternateView htmlView = AlternateView.CreateAlternateViewFromString(html, Encoding.UTF8, MediaTypeNames.Text.Html);
            //LinkedResource top = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\top-shadow-basica.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource cabecera = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\cabecera-basica.jpg", MediaTypeNames.Image.Jpeg);
            //LinkedResource shadow = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\shadow-basica.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource producto = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\producto.jpg", MediaTypeNames.Image.Jpeg);
            //LinkedResource t = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\twitter.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource f = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\facebook.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource s = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\shadow-basica.png", MediaTypeNames.Image.Jpeg);
            //LinkedResource boton = new LinkedResource(@"C:\Users\JuandeDios\Documents\11.-TRABAJOS\Modelado De Sistemas\imagenes\boton.jpg", MediaTypeNames.Image.Jpeg);

            //top.ContentId = "top";
            //cabecera.ContentId = "cabecera";
            //shadow.ContentId = "shadow";
            //t.ContentId = "t";
            //f.ContentId = "f";
            //s.ContentId = "s";
            //producto.ContentId = "producto";
            //boton.ContentId = "boton";
            //htmlView.LinkedResources.Add(top);
            //htmlView.LinkedResources.Add(cabecera);
            //htmlView.LinkedResources.Add(shadow);
            //htmlView.LinkedResources.Add(t);
            //htmlView.LinkedResources.Add(f);
            //htmlView.LinkedResources.Add(producto);
            //htmlView.LinkedResources.Add(s);
            //htmlView.LinkedResources.Add(boton);
            mail.AlternateViews.Add(plainView);
            mail.AlternateViews.Add(htmlView);
            client.Send(mail);
        }
    }
    
}
