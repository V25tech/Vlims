using Dealfoundry.Common.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace PolicySummary.Sheet1.Services
{
    public static class CommonConverter
    {
        public static int SetRowsCount(DataSet dataset)
        {
            if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0 && dataset.Tables[0].Columns.Contains(ResponseContextConstants.TotalRows))
                return Convert.ToInt32(dataset.Tables[0].Rows[0][ResponseContextConstants.TotalRows]);
            else
                return 0;
        }
    }
}
