//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Vlims.Services
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    
    using VAMLIbrary.Core.Extentions;
    using Vlims.Entities;



    // Comment
    public static class dashboardconfigurationConverter
    {
        
        public static List<dashboardconfiguration> SetAlldashboardconfiguration(DataSet dataset)
        {
            try
            {
                List<dashboardconfiguration> result = new List<dashboardconfiguration>();
                dashboardconfiguration dashboardconfigurationData;
                if (dataset != null && dataset.Tables.Count > 0 && dataset.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; (i < dataset.Tables[0].Rows.Count); i = (i + 1))
                    {
                        DataRow row = dataset.Tables[0].Rows[i];
                        dashboardconfigurationData = new dashboardconfiguration();
                        dashboardconfigurationData.DCId = Convert.ToString(row[dashboardconfigurationConstants.DCId.TrimAt()]);
                        dashboardconfigurationData.DocumentMasterId = Convert.ToString(row[dashboardconfigurationConstants.DocumentMasterId.TrimAt()]);
                        dashboardconfigurationData.CreatedBy = Convert.ToString(row[dashboardconfigurationConstants.CreatedBy.TrimAt()]);
                        dashboardconfigurationData.CreatedDate = DatatypeConverter.SetDateTime(row[dashboardconfigurationConstants.CreatedDate.TrimAt()]);
                        dashboardconfigurationData.ModifiedBy = Convert.ToString(row[dashboardconfigurationConstants.ModifiedBy.TrimAt()]);
                        dashboardconfigurationData.ModifiedDate = DatatypeConverter.SetDateTime(row[dashboardconfigurationConstants.ModifiedDate.TrimAt()]);
                        result.Add(dashboardconfigurationData);
                    }
                }
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        
        public static dashboardconfiguration Setdashboardconfiguration(DataSet dataset)
        {
            var result = SetAlldashboardconfiguration(dataset);
            if (result.Count > 0)
            {
                return result.FirstOrDefault();
            }
            return null;
        }
    }
}
