using PolicySummary.Sheet1.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using VAMLIbrary.Core.Common;

namespace Vlims.Services
{
    public class MasterDataService : IMasterDataService
    {
        private readonly IMasterDataData masterData;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="agencyData"></param>
        /// <param name="agencyContactService"></param>
        /// <param name="agencyOfficeService"></param>
        public MasterDataService(IMasterDataData masterData)
        {
            this.masterData = masterData;
        }
       

        public List<ZipCodeInformation> GetZipcodes(string fields, string Zipcode)
        {
            try
            {
                string[] fieldsArray = fields.Split(",");
                IEnumerable<Condition> conditionsEntity = MasterDataConverter.TransformConditioModelToEntity(fieldsArray, Zipcode);
                var result = masterData.GetZipCodesDataMasterData(fieldsArray, conditionsEntity);
                List<ZipCodeInformation> ZipCodeInformation = MasterDataConverter.GetZipCodes(result);
                return ZipCodeInformation;
            }
            catch
            {
                throw;
            }
        }

    }
}
