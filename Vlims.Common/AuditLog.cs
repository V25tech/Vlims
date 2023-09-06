using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vlims.Administration.Manager;

namespace Vlims.Common
{
    public class AuditLog : IAuditConfigurationService
    {
        /// <summary>
        /// Saving Audit 
        /// </summary>
        /// <param name="auditLog"></param>
        public static void SaveAuditLog(AuditLogEntity auditLog)
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
                List<SqlParameter> parameters = new()
                {
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@EntityName",Value=auditLog.EntityName},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@UserName",Value=auditLog.UserName},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@Message",Value=auditLog.Message},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@Type",Value=auditLog.Type},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@Action",Value=auditLog.Action},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@CreatedDate",Value=auditLog.CreatedDate},
                new SqlParameter{SqlDbType=SqlDbType.VarChar,ParameterName="@state",Value=auditLog.state},
                };
                result = Convert.ToBoolean(dataAccessHelper.ExecuteStoredProcedure("dbo.USP_AUDIT_LOG_PSY_INSERT", parameters, ExecutionType.NonQuery, 600));
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


        public List<AuditLogEntity> GetAllAuditConfiguration(string type)
        {
            List<AuditLogEntity> result = new List<AuditLogEntity>();
            //List<SqlParameter> l_params = new List<SqlParameter>
            //{
            //    new SqlParameter {SqlDbType=SqlDbType.VarChar,ParameterName="type",Value=type}
            //};
            object obj = dataAccessHelper.ExecuteStoredProcedure("USP_AUDIT_LOG_GET_ALL", null, ExecutionType.NonQuery, 600);
            DataSet? ds = obj as DataSet;
            if (ds != null)
            {
                foreach (var item in ds.Tables[0].AsEnumerable())
                {
                    AuditLogEntity entity = new AuditLogEntity()
                    {
                        EntityName = Convert.ToString(item["@EntityName"].ToString()),
                        UserName = Convert.ToString(item["@UserName"]),
                        Message = Convert.ToString(item["@Message"]),
                        Type = Convert.ToString(item["@Type"]),
                        Action = (Actions)Enum.Parse(typeof(Actions), Convert.ToString(item["@Action"])),
                        CreatedDate = Convert.ToDateTime(item["@CreatedDate"]),
                        state = (DefinitionStatus)Enum.Parse(typeof(DefinitionStatus), Convert.ToString(item["@state"])),
                    };
                    result.Add(entity);
                }
            }
            return result;
        }

        public bool SaveAuditConfiguration(AuditLogEntity roleConfiguration)
        {
            throw new NotImplementedException();
        }
    }
}
