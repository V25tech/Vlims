using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Data;
using System.Collections.Generic;
using Newtonsoft.Json;
using VAMLIbrary.Core.Extentions;
using VAMLIbrary.Core.Common;

namespace PolicySummary.Sheet1.Services
{
    public static class MasterDataConverter
    {        
        internal static List<ZipCodeInformation> GetZipCodes(List<ZipCodeInformation> entityZipCodes)
        {
            try
            {
                List<ZipCodeInformation> zipCodeInformation = new List<ZipCodeInformation>();
                if (entityZipCodes != null)
                {
                    zipCodeInformation = entityZipCodes
                        .GroupBy(ezc => new
                        {
                            ezc.ZipCode,
                            ezc.CountyName,
                            ezc.State,
                            ezc.City,
                            ezc.StateAbbrivation
                        })
                        .Select(vm => new ZipCodeInformation
                        {
                            ZipCode = vm.Key.ZipCode,
                            State = vm.Key.State,
                            CountyName = vm.Key.CountyName,
                            City = vm.Key.City,
                            StateAbbrivation=vm.Key.StateAbbrivation
                        }).ToList();
                }
                return zipCodeInformation;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static IEnumerable<Condition> TransformConditioModelToEntity(string[] fields, string Zipcode)
        {
            List<Condition> lstCondition = new List<Condition>();

            Condition condition = new Condition();
            if (fields.Any(c => c.Contains("STATE_ZIP")))
            {
                condition.ColumnName = "ZIPCODE_ZIP";
                condition.Operator = Operator.Equal;
                condition.Value = Zipcode;
                lstCondition.Add(condition);               
            }
            else if (fields.Any(c => c.Contains("STATE_ABBREVIATION_ZIP")))
            {
                condition.ColumnName = "ZIPCODE_ZIP";
                condition.Operator = Operator.Equal;
                condition.Value = Zipcode;
                lstCondition.Add(condition);
            }
            else if (fields.Any(c => c.Contains("ZIPCODE_ZIP")))
            {
                condition.ColumnName = "ZIPCODE_ZIP";
                condition.Operator = Operator.Like;
                condition.Value = Zipcode;
                lstCondition.Add(condition);
            }
            else if (fields.Any(c => c.Contains("CITY_ZIP")))
            {
                condition.ColumnName = "ZIPCODE_ZIP";
                condition.Operator = Operator.Equal;
                condition.Value = Zipcode;
                lstCondition.Add(condition);
            }
            else
            {
                condition.ColumnName = "ZIPCODE_ZIP";
                condition.Operator = Operator.Equal;
                condition.Value = Zipcode;
                lstCondition.Add(condition);
            }

            return lstCondition;
        }

    }
}
