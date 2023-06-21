using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using VAMLibrary.Core;
using VAMLIbrary.Core.Common;
using VAMLIbrary.Core.Constants;
using VAMLIbrary.Core.Extentions;

namespace PolicySummary.Sheet1.Data
{
    public class MasterDataData : IMasterDataData
    {
        private readonly DataAccessHelper dataAccessHelper;

        private readonly Database database;

        public MasterDataData(DataAccessHelper dataAccessHelper, Database database)
        {
            this.dataAccessHelper = dataAccessHelper;
            this.database = database;
        }
        

        /// <summary>
        /// gets ZipCodeData master data based on selected columns and conditions
        /// </summary>
        /// <param name="selectColumns">Selected columns</param>
        /// <param name="conditions">Conditions on columns</param>
        /// <returns></returns>
        public List<ZipCodeInformation> GetZipCodesDataMasterData(string[] selectColumns, IEnumerable<Condition> conditions)
        {
            DataTable data = null;
            DataSet ds = null;
            DataTable dtSortedTable = null;
            List<string> selectedColumnList = null;
            List<ZipCodeInformation> ZipCodeInformation = null;
            try
            {
                DbCommand cmd = database.GetStoredProcCommand(AddressConstants.USP_GETZIPCODESDATA_MASTERDATA);
                string selectedColumns = string.Empty;
                if (selectColumns != null && selectColumns.Any())
                {                    
                    selectedColumnList = new List<string>();
                    if (selectColumns.Any(c => c.Contains("ID_ZIP")))
                    {
                        selectedColumnList.Add("ID_ZIP");
                    }

                    if (selectColumns.Any(c => c.Contains("ZIPCODE_ZIP")))
                    {
                        selectedColumnList.Add("ZIPCODE_ZIP");
                    }

                    if (selectColumns.Any(c => c.Contains("CITY_ZIP")))
                    {
                        selectedColumnList.Add("CITY_ZIP");
                    }

                    if (selectColumns.Any(c => c.Contains("COUNTYNAME_ZIP")))
                    {
                        selectedColumnList.Add("COUNTYNAME_ZIP");
                    }

                    if (selectColumns.Any(c => c.Contains("STATE_ZIP")))
                    {
                        selectedColumnList.Add("STATE_ZIP");
                    }
                    if (selectColumns.Any(c => c.Contains("STATE_ABBREVIATION_ZIP")))
                    {
                        selectedColumnList.Add("STATE_ABBREVIATION_ZIP");
                    }


                    selectedColumns = selectedColumnList.GetConcatenatedString();
                }

                StringBuilder query = new StringBuilder();
                if (conditions != null && conditions.Any())
                {
                    foreach (Condition condition in conditions.AsEnumerable())
                    {
                        if (condition.Value.Contains("'"))
                        {
                            condition.Value = condition.Value.FormatSpecialCharacter();
                        }

                        if (Convert.ToInt16(condition.Operator) == 6)
                        {
                            query.Append(" AND " + condition.ColumnName + AddressConstants.Space + GetOperator(condition.Operator) + AddressConstants.Space + AddressConstants.Apostrophic + condition.Value + AddressConstants.PercentSign + AddressConstants.Apostrophic);
                        }
                        else
                        {
                            query.Append(" AND " + condition.ColumnName + AddressConstants.Space + GetOperator(condition.Operator) + AddressConstants.Space + AddressConstants.Apostrophic + condition.Value + AddressConstants.Apostrophic);
                        }
                    }
                }

                database.AddInParameter(cmd, "CONDITIONS", DbType.String, query.ToString());
                database.AddInParameter(cmd, "SELECTEDCOLUMNS", DbType.String, selectedColumns);
                ds = database.ExecuteDataSet(cmd);

                if (ds != null && ds.Tables != null && ds.Tables.Count != 0 && ds.Tables[0].Rows.Count > 0)
                {
                    data = ds.Tables[0];                   
                    if (selectedColumnList != null && selectedColumnList.Count() == 1 && (selectedColumnList[0] == "STATE_ABBREVIATION_ZIP" || selectedColumnList[0] == "STATE_ZIP" || selectedColumnList[0] == "CITY_ZIP" || selectedColumnList[0] == "ZIPCODE_ZIP"))
                    {
                        dtSortedTable = data.AsEnumerable().OrderBy(row => row.Field<string>(selectedColumnList[0])).CopyToDataTable();
                    }
                    else
                    {
                        dtSortedTable = data.Copy();
                    }

                    if (dtSortedTable != null)
                    {
                        ZipCodeInformation = new List<ZipCodeInformation>();
                        List<ZipCodeInfo> zipCodeInformation = new List<ZipCodeInfo>();
                        ZipCodeInformation zipcodes = null;
                        List<string> City = new List<string>();
                        int id = 1;
                        if (dtSortedTable.Rows != null && dtSortedTable.Rows.Count > 0)
                        {
                            foreach (DataRow row in dtSortedTable.Rows)
                            {
                                if (dtSortedTable.Columns.Count == 1)
                                {
                                    zipcodes = new ZipCodeInformation();
                                    zipcodes.ZipCode = Convert.ToString(row[AddressConstants.ZIPCODE_ZIP]);
                                }
                                else
                                {
                                    zipcodes = new ZipCodeInformation();
                                    zipcodes.ZipId = id;
                                    zipcodes.State = Convert.ToString(row[AddressConstants.STATE_ZIP]);
                                    zipcodes.ZipCode = Convert.ToString(row[AddressConstants.ZIPCODE_ZIP]);
                                    City.Add(Convert.ToString(row[AddressConstants.CITY_ZIP]));
                                    zipcodes.City = City;
                                    zipcodes.StateAbbrivation = Convert.ToString(row[AddressConstants.STATE_ABBREVIATION_ZIP]);
                                    id++;
                                }
                                ZipCodeInformation.Add(zipcodes);
                            }

                        }
                    }
                }

            }

            catch (Exception ex)
            {
                throw ex;
            }
            return ZipCodeInformation;
        }

        /// <summary>
        /// A Method to Get Operators.
        /// </summary>
        /// <param name="op">Operator Object</param>
        /// <returns> Returns Selected Operator</returns>
        private static string GetOperator(Operator op)
        {
            switch (op)
            {
                case Operator.GreaterThan:
                    return AddressConstants.GreaterThan;

                case Operator.LessThan:
                    return AddressConstants.LessThan;

                case Operator.GreaterThanOrEqual:
                    return AddressConstants.GreaterThanOrEqual;

                case Operator.LessThanOrEqual:
                    return AddressConstants.LessThanOrEqual;

                case Operator.NotEqual:
                    return AddressConstants.NotEqual;

                case Operator.Like:
                    return AddressConstants.Like;

                default:
                    return AddressConstants.Equal;
            }
        }


    }
}
