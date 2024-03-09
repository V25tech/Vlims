using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vlims.Common;

namespace Vlims.DocumentManager.DataAccess
{
    public static class ExisitingDocumentsData
    {
        public static DataSet GetAllExistingDocuments(RequestContext requestContext)
        {
			try
			{
				DataSet dataSet = new DataSet();
                List<SqlParameter> sqlparms = new List<SqlParameter>();
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageNumber, Value = requestContext.PageNumber });
                sqlparms.Add(new SqlParameter { DbType = DbType.Int32, ParameterName = RequestContextConstants.PageSize, Value = requestContext.PageSize });
                sqlparms.Add(new SqlParameter { DbType = DbType.String, ParameterName = RequestContextConstants.UserName, Value = requestContext.userName });
                DataSet dataset = (DataSet)dataAccessHelper.ExecuteStoredProcedure(ExistingDocumentRequestConstants.USP_ExistingDocuments_PSY_GET_ALL, sqlparms, ExecutionType.Dataset);
                return dataset;
            }
			catch (Exception)
			{

				throw;
			}
        }
    }
}
