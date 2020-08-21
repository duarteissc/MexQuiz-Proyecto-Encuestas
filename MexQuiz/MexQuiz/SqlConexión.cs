using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de SqlConexión
/// </summary>
public class SqlConexión
{
    private SqlConnection _conn = null;
    string _ConnectionString = "";
    bool _Conectado = false;
    string _NombreProcedimiento = "";
    List<SqlParameter> _Parametros = new List<SqlParameter>();
    bool _Preparado = false;
    public SqlConexión()
    {

    }
    public bool Conectar(string conex)
    {
        bool _Rsp = false;
        _conn = new SqlConnection(conex);
        try
        {
            _conn.Open();
            _Conectado = true;
            _Rsp = true;

        }
        catch(SqlException SqlEx)
        {
            string MensajeError = "ERROR:" + SqlEx.Message + "." + "LINEA:" + SqlEx.LineNumber + ".";
           
        }
        catch
        {
            _Rsp = false;
        }
        return _Rsp;
    }
    public void Desconectar()
    {
        try
        {
            _conn.Close();
        }
        catch
        {

        }
    }
    public void PrepararProcedimiento(string NombreProcedimiento,List<SqlParameter>Parametros)
    {
        if(_Conectado)
        {
            //Se Valida si existe algo en memoria y se limpia
            _NombreProcedimiento = NombreProcedimiento;
            _Parametros.Clear();
            //Asigno a Variables locales los parametros
            _NombreProcedimiento = NombreProcedimiento;
            _Parametros = Parametros;
            //Habilito bandera en tru para indicar que esta listo el procedimiento para ejecutarse
            _Preparado = true;

        }
        else
        {
            throw new Exception("No hay conexion a la BD");
        }
    }
    public void PrepararProcedimiento(string NombreProcedimiento)
    {
        if (_Conectado)
        {
            //Se Valida si existe algo en memoria y se limpia
            _NombreProcedimiento = NombreProcedimiento;
            //Asigno a Variables locales los parametros
            _NombreProcedimiento = NombreProcedimiento;
            //Habilito bandera en tru para indicar que esta listo el procedimiento para ejecutarse
            _Preparado = true;

        }
        else
        {
            throw new Exception("No hay conexion a la BD");
        }
    }
    public DataTableReader EjecutarTableReader()
    {
        if(_Preparado)
        {
            DataTable dt = new DataTable();
            SqlCommand cmm = new SqlCommand(_NombreProcedimiento, _conn);
            cmm.CommandType = System.Data.CommandType.StoredProcedure;
            cmm.Parameters.AddRange(_Parametros.ToArray());
            SqlDataAdapter adt = new SqlDataAdapter(cmm);
            adt.Fill(dt);
            _Preparado = false;
            return dt.CreateDataReader();
        }
        else
        {
            _Preparado = false;
            throw new Exception("Procedimiento no preparado");
        }
    }
    public int EjecutarProcedimiento()
    {
        if (_Preparado)
        {
            SqlCommand cmm = new SqlCommand(_NombreProcedimiento, _conn);
            cmm.CommandType = System.Data.CommandType.StoredProcedure;
            cmm.CommandTimeout = 120;
            cmm.Parameters.AddRange(_Parametros.ToArray());
            
            _Preparado = false;
            return cmm.ExecuteNonQuery();
        }
        else
        {
            _Preparado = false;
            throw new Exception("Procedimiento no preparado");
        }
    }
}