//using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data.Common;
using System.Data;
using System.Reflection;
//using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using System.Data.SqlClient;
using System.Drawing;
using System.Security.Cryptography;
//
//

namespace Vlims.Common
{
    public static class dataAccessHelper
    {

        public static Database _database { get; set; }



        static dataAccessHelper()
        {
            CreateConnection();
        }

        private static void CreateConnection()
        {
            DbConnection con = null;


            // _database = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase("Data Source=DESKTOP-RJCK03U\\MSSQLSERVER01;Initial Catalog=Vlims;User ID=sa;Password=Passw0rd;Pooling=true;Min Pool Size=0;Max Pool Size=1024");
            _database = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase("Data Source=172.173.216.235;Initial Catalog=VLIMSV2;User ID=V25TechAdmin;Password=Producttechadmin@123;Pooling=true;Min Pool Size=0;Max Pool Size=1024");
            con = _database.CreateConnection();
        }

        public static object ExecuteStoredProcedure(string p_procName, List<SqlParameter> p_sqlParams, ExecutionType p_type, int p_timeout = 30)
        {
            //IL_00d5: Unknown result type (might be due to invalid IL or missing references)
            try
            {
                DbCommand storedProcCommand = _database.GetStoredProcCommand(p_procName);
                if (p_sqlParams != null && p_sqlParams.Count > 0)
                {
                    storedProcCommand.Parameters.AddRange(p_sqlParams.ToArray());
                }

                storedProcCommand.CommandTimeout = p_timeout;
                switch (p_type)
                {
                    case ExecutionType.Dataset:
                        return _database.ExecuteDataSet(storedProcCommand);
                    case ExecutionType.NonQuery:
                        return _database.ExecuteNonQuery(storedProcCommand);
                    case ExecutionType.Scalar:
                        return _database.ExecuteScalar(storedProcCommand);
                    case ExecutionType.Reader:
                        return ((DataReaderWrapper)(RefCountingDataReader)_database.ExecuteReader(storedProcCommand)).InnerReader;
                }
            }
            catch (SqlException ex)
            {
                Createlog(ex.Message, string.Empty);
                throw ex;
            }
            catch (Exception ex2)
            {
                Createlog(ex2.Message, string.Empty);
                throw ex2;
            }

            return null;
        }

        public static object ExecuteBulkStoredProcedure(string p_procName, List<SqlParameter> p_sqlParams, DataSet dataSet, ExecutionType p_type, int p_timeout = 30)
        {
            //IL_015c: Unknown result type (might be due to invalid IL or missing references)
            try
            {
                DbCommand storedProcCommand = _database.GetStoredProcCommand(p_procName);
                if (p_sqlParams != null && p_sqlParams.Count > 0)
                {
                    foreach (SqlParameter p_sqlParam in p_sqlParams)
                    {
                        _database.AddInParameter(storedProcCommand, p_sqlParam.ParameterName, p_sqlParam.DbType, p_sqlParam.Value);
                    }
                }

                if (dataSet.Tables != null && dataSet.Tables.Count > 0)
                {
                    foreach (DataTable table in dataSet.Tables)
                    {
                        //((SqlDatabase)_database).AddInParameter(storedProcCommand, "@" + table.TableName, SqlDbType.Structured, table);
                    }
                }

                storedProcCommand.CommandTimeout = p_timeout;
                switch (p_type)
                {
                    case ExecutionType.Dataset:
                        return _database.ExecuteDataSet(storedProcCommand);
                    case ExecutionType.NonQuery:
                        return _database.ExecuteNonQuery(storedProcCommand);
                    case ExecutionType.Scalar:
                        return _database.ExecuteScalar(storedProcCommand);
                        //case ExecutionType.Reader:
                        //    return ((DataReaderWrapper)(RefCountingDataReader)_database.ExecuteReader(storedProcCommand)).get_InnerReader();
                }
            }
            catch (SqlException ex)
            {
                Createlog(ex.Message, string.Empty);
                throw ex;
            }
            catch (Exception ex2)
            {
                Createlog(ex2.Message, string.Empty);
                throw ex2;
            }

            return null;
        }

        public static List<SqlParameter> GenerateSqlParameter<T>(T obj)
        {
            List<SqlParameter> list = new List<SqlParameter>();
            try
            {
                PropertyInfo[] properties = typeof(T).GetProperties();
                string name = properties[0].DeclaringType!.Name;
                string text = name.Substring(0, 3);
                PropertyInfo[] array = properties;
                foreach (PropertyInfo propertyInfo in array)
                {
                    PropertyInfo property = obj.GetType().GetProperty(propertyInfo.Name);
                    object value = property.GetValue(obj, null);
                    list.Add(new SqlParameter
                    {
                        SqlDbType = GetDbType(propertyInfo.PropertyType.ToString()),
                        ParameterName = propertyInfo.Name + "_" + text,
                        Value = value
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list;
        }

        private static SqlDbType GetDbType(string strPropertyNam)
        {
            return strPropertyNam switch
            {
                "System.Int32" => SqlDbType.Int,
                "System.String" => SqlDbType.NVarChar,
                "System.DateTime" => SqlDbType.DateTime,
                "System.Boolean" => SqlDbType.Bit,
                _ => SqlDbType.Text,
            };
        }

        public static object ExecuteStoredProcedure(string p_procName, string p_parameterName, DbType p_dbType, object p_value, ExecutionType p_type, int p_timeout = 30)
        {
            //IL_0086: Unknown result type (might be due to invalid IL or missing references)
            try
            {
                DbCommand storedProcCommand = _database.GetStoredProcCommand(p_procName);
                storedProcCommand.CommandType = CommandType.StoredProcedure;
                _database.AddInParameter(storedProcCommand, p_parameterName, p_dbType, p_value);
                storedProcCommand.CommandTimeout = p_timeout;
                switch (p_type)
                {
                    case ExecutionType.Dataset:
                        return _database.ExecuteDataSet(storedProcCommand);
                    case ExecutionType.NonQuery:
                        return _database.ExecuteNonQuery(storedProcCommand);
                    case ExecutionType.Scalar:
                        return _database.ExecuteScalar(storedProcCommand);
                        //case ExecutionType.Reader:
                        //    return ((DataReaderWrapper)(RefCountingDataReader)_database.ExecuteReader(storedProcCommand)).get_InnerReader();
                }
            }
            catch (SqlException ex)
            {
                Createlog(ex.Message, string.Empty);
                throw ex;
            }
            catch (Exception ex2)
            {
                Createlog(ex2.Message, string.Empty);
                throw ex2;
            }
            finally
            {
            }

            return null;
        }

        private static void Createlog(string p_message, string p_query)
        {
            try
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + "Connectionlogfilepath " + DateTime.Now.ToString("ddMMMyyyy") + ".txt";
                using StreamWriter streamWriter = new StreamWriter(path, append: true);
                streamWriter.WriteLine(DateTime.Now.ToString());
                streamWriter.WriteLine(p_message);
                streamWriter.WriteLine("");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public enum ExecutionType
    {
        Dataset,
        NonQuery,
        Reader,
        Scalar
    }
}

