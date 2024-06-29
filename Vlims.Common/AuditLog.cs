using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vlims.Administration.Manager;
using System.Xml.Linq;


namespace Vlims.Common
{
    public class AuditLog
    {



        public static bool SaveAuditLog(AuditLogEntity auditLog)
        {
            switch (auditLog.state)
            {
                case DefinitionStatus.New:
                    auditLog.Action = Actions.Added;
                    auditLog.Message = "Added" + auditLog.Type.ToLower() + " " + auditLog.EntityName;
                    break;
                case DefinitionStatus.Modify:
                    auditLog.Action = Actions.Modified;
                    auditLog.Message = "Updated" + auditLog.Type.ToLower() + " " + auditLog.EntityName;
                    break;
                default:
                    break;
            }
            InsertAuditLog(auditLog);
            return true;
        }
        /// <summary>
        /// Inserting Audit Infor
        /// </summary>
        /// <param name="auditLog"></param>
        /// <returns></returns>
        public static bool InsertAuditLog(AuditLogEntity auditLog)
        {
            bool result;
            try
                {
                //auditLog.JsonData = JsonSerializer.Serialize(auditLog.EntityInfo);

                List<SqlParameter> parameters = new()
                {
               
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@UserName",Value=auditLog.UserName},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@Message",Value=auditLog.Message},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@Type",Value=auditLog.Type},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@Action",Value=auditLog.Action},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@EntityName",Value=auditLog.EntityName},         
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@state",Value=auditLog.state},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@Unique",Value=auditLog.Unique},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@JsonData",Value=JsonSerializer.Serialize(auditLog.EntityInfo) },
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@REVISION_NUMBER_PSY",Value=JsonSerializer.Serialize(auditLog.RevisionNumber),

            },
                };
                result = Convert.ToBoolean(dataAccessHelper.ExecuteStoredProcedure("dbo.USP_AUDIT_LOGS_PSY_INSERT_NEW", parameters, ExecutionType.Scalar, 600));
                }
            catch (SqlException ex)
            {
                throw;
            }
            return result;
        }
        /// <summary>
        /// Audit Log Get
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>


        public static List<AuditLogEntity> GetAllAuditConfiguration(string type)
         {
            List<AuditLogEntity> result = new List<AuditLogEntity>();
            List<SqlParameter> l_params = new List<SqlParameter>
            {
                new SqlParameter {SqlDbType=SqlDbType.VarChar,ParameterName="@type",Value=type}
            };
            DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure("USP_AUDIT_LOGS_PSY_GET_ALL_NEW", l_params, ExecutionType.Dataset, 600);

            //object obj = dataAccessHelper.ExecuteStoredProcedure("USP_AUDIT_LOG_GET_ALL", null, ExecutionType.NonQuery, 600);
            DataSet? ds = dataset;
            if (ds != null)
            {
                foreach (var item in ds.Tables[0].AsEnumerable())
                {




                    AuditLogEntity entity = new AuditLogEntity()
                    {
                        //printauditid = Convert.ToInt64(item["AuditId_PSY"]).ToString(),
                        UserName = Convert.ToString(item["UserName"]),
                        Message = Convert.ToString(item["Message"]),
                        Type = Convert.ToString(item["Type"]),
                        Action = (Actions)Enum.Parse(typeof(Actions), Convert.ToString(item["Action"])),
                        EntityName = Convert.ToString(item["EntityName"].ToString()),                
                        state = (DefinitionStatus)Enum.Parse(typeof(DefinitionStatus), Convert.ToString(item["state"])),
                        CreatedDate = Convert.ToDateTime(item["CreatedDate_PSY"]),
                        EntityInfo = JsonSerializer.Deserialize<dynamic>(Convert.ToString(item["JsonData"])),
                        Unique = Convert.ToString(item["Unique"].ToString())


                    };
                    result.Add(entity);
                }
            }
            return result;
        }





        public static List<AuditLogEntity> GetAllAuditConfigurationByEntityName(string entityname)
        {
            List<AuditLogEntity> result = new List<AuditLogEntity>();


            List<SqlParameter> l_params = new List<SqlParameter>
            {
                new SqlParameter {SqlDbType=SqlDbType.VarChar,ParameterName="@Unique",Value=entityname}
            };
            DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure("USP_AUDIT_LOGS_PSY_GET_BY_ENITYNAME_NEW", l_params, ExecutionType.Dataset, 600);

            //object obj = dataAccessHelper.ExecuteStoredProcedure("USP_AUDIT_LOG_GET_ALL", null, ExecutionType.NonQuery, 600);
            DataSet? ds = dataset;
            if (ds != null)
            {
                foreach (var item in ds.Tables[0].AsEnumerable())
                {




                    AuditLogEntity entity = new AuditLogEntity()
                    {
                        //printauditid = Convert.ToString(item["AuditId_PSY"]),
                        UserName = Convert.ToString(item["UserName"]),
                        Message = Convert.ToString(item["Message"]),
                        Type = Convert.ToString(item["Type"]),                       
                        Action = (Actions)Enum.Parse(typeof(Actions), Convert.ToString(item["Action"])),
                        EntityName = Convert.ToString(item["EntityName"].ToString()),
                        state = (DefinitionStatus)Enum.Parse(typeof(DefinitionStatus), Convert.ToString(item["state"])),                 
                        CreatedDate = Convert.ToDateTime(item["CreatedDate_PSY"]),                    
                        EntityInfo = JsonSerializer.Deserialize<dynamic>(Convert.ToString(item["JsonData"])),

                    };
                    result.Add(entity);
                }
            }
            return result;
        }



    }
}
