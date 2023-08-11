//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PolicySummary.DMS.Services
{
    using System;
    using System.Text;
    using System.IO;
    using System.Linq;
    using System.Data;
    using System.Collections.Generic;
    using Vlims.Common;
    using Microsoft.VisualBasic;
    using Microsoft.AspNetCore.Http;
    using Vlims.DMS.Entities;
    using System.Globalization;
    using System.Reflection.Metadata;



    // Comment
    public class ExistingDocumentRequestService : IExistingDocumentRequestService
    {



        public ResponseContext<ExistingDocumentRequest> GetAllExistingDocumentRequest(RequestContext requestContext)
        {
            try
            {
                DataSet dataset = ExistingDocumentRequestData.GetAllExistingDocumentRequest(requestContext);
                List<ExistingDocumentRequest> result = ExistingDocumentRequestConverter.SetAllExistingDocumentRequest(dataset);
                return new ResponseContext<ExistingDocumentRequest>() { RowCount = CommonConverter.SetRowsCount(dataset), Response = result };
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public ExistingDocumentRequest GetExistingDocumentRequestByEDRId(string eDRId)
        {
            try
            {
                DataSet dataset = ExistingDocumentRequestData.GetExistingDocumentRequestByEDRId(eDRId);
                ExistingDocumentRequest result = ExistingDocumentRequestConverter.SetExistingDocumentRequest(dataset);
                return result;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool SaveExistingDocumentRequest(ExistingDocumentRequest existingDocumentRequest)
        {
            try
            {
                String validationMessages = ExistingDocumentRequestValidator.IsValidExistingDocumentRequest(existingDocumentRequest);
                if (validationMessages.Length <= 0)
                {
                    var result = ExistingDocumentRequestData.SaveExistingDocumentRequest(existingDocumentRequest);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool UpdateExistingDocumentRequest(ExistingDocumentRequest existingDocumentRequest)
        {
            try
            {
                String validationMessages = ExistingDocumentRequestValidator.IsValidExistingDocumentRequest(existingDocumentRequest);
                if (validationMessages.Length <= 0)
                {
                    bool result = ExistingDocumentRequestData.UpdateExistingDocumentRequest(existingDocumentRequest);
                    return result;
                }
                throw new System.Exception(validationMessages);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteExistingDocumentRequestByEDRId(string eDRId)
        {
            try
            {
                return ExistingDocumentRequestData.DeleteExistingDocumentRequestByEDRId(eDRId);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        public bool DeleteAllExistingDocumentRequest(List<int> eDRIds)
        {
            try
            {
                return ExistingDocumentRequestData.DeleteAllExistingDocumentRequest(eDRIds);
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
        public bool Importbulkdocuments(IFormFile p_fileInfo)
        {
            DataSet l_dsInfo;
            List<string> l_numericColumns = null;
            ExistingDocumentRequest existingDocumentRequest = null;
            string isRatesDataImported = string.Empty;
            string baseDirectory = string.Empty;
            try
            {
                string file = string.Empty; string errMsg = string.Empty;
                file = FileManager.GetFilePath(p_fileInfo);
                baseDirectory = Path.GetDirectoryName(file) + "/" + p_fileInfo.FileName.Replace("\".zip\"", string.Empty);
                if (Directory.Exists(baseDirectory))
                    Directory.Delete(baseDirectory, true);
                System.IO.Compression.ZipFile.ExtractToDirectory(file, Path.GetDirectoryName(file), true);
                //baseDirectory = baseDirectory + Constants.XmlPath + p_file.FileName.Replace(Constants.Zip, string.Empty);
                l_dsInfo = ReadExcelFileWithValueType(p_fileInfo, l_numericColumns);
                List<string> lstEntityNamesFromExcel = new List<string>();              
                if (l_dsInfo.Tables[0]?.Rows?.Count > 0)
                {
                    var ValidNameRegExp = string.Empty;
                    foreach (DataRow row in l_dsInfo.Tables[0]?.Rows)
                    {
                        existingDocumentRequest = new ExistingDocumentRequest();
                        existingDocumentRequest.documenttype = row["DocumentType"]?.ToString();
                        existingDocumentRequest.department = row["Department"]?.ToString();
                        existingDocumentRequest.documenttitle = row["DocumentTitle"]?.ToString();
                        existingDocumentRequest.documentno = row["DocumentNo"]?.ToString();
                        existingDocumentRequest.effectiveDate = DateTime.Now;
                            //Convert.ToDateTime(row["EffectiveDate"]?.ToString());
                        existingDocumentRequest.reviewDate = DateTime.Now;
                        existingDocumentRequest.sampletemplate = "Test";
                        existingDocumentRequest.CreatedBy = "ADMIN";
                        existingDocumentRequest.ModifiedBy = "ADMIN";
                        existingDocumentRequest.CreatedDate = DateTime.Now;
                        existingDocumentRequest.document = row["UploadDocument"]?.ToString();                        
                        SaveExistingDocumentRequest(existingDocumentRequest);
                    }
                    #region Commented Region
                    //if ((p_lookupTableInfo.LookupFactors == null || p_lookupTableInfo.LookupFactors.Count.Equals(0)) &&
                    //    l_l_dsInfoInfo != null && l_l_dsInfoInfo.Tables != null && l_l_dsInfoInfo.Tables.Count > 0 && l_l_dsInfoInfo.Tables[0].Rows != null && l_l_dsInfoInfo.Tables[0].Rows.Count > 1)
                    //    throw new Exception(message: string.Format(Constants.MultpleRowsError, "lookup"));

                    //LookupTableInfo lookupTableInfo = p_lookupTableInfo;
                    //if (p_IsMultiDimension)
                    //    lookupTableInfo.RateTable = ConvertToMultiPlanLookupTableData(l_l_dsInfoInfo, p_lookupTableInfo);
                    //else
                    //{
                    //    lookupTableInfo = BuildLookupTableDataFormDataTable(l_l_dsInfoInfo, p_lookupTableInfo);
                    //}
                    //if (p_lookupTableInfo.Mode.Equals(DefinitionStatus.New))
                    //    isRatesDataImported = RatesDAO.InsertLookupData(lookupTableInfo, new WorkspaceContext());
                    //else isRatesDataImported = RatesDAO.UpdateLookupTableData(lookupTableInfo, new WorkspaceContext()); 
                    #endregion
                }
            }
            catch
            {
                throw;
            }
            return true;
        }

        /// <summary>
        /// Read Excel File With Value Type
        /// </summary>
        /// <param name="p_fileInfo"></param>
        /// <param name="p_numericColumns"></param>
        /// <returns></returns>
        private DataSet ReadExcelFileWithValueType(IFormFile p_fileInfo, List<string> p_numericColumns)
        {
            DataSet l_dsInfo = null;
            ExcelDocument excelDoc = new ExcelDocument();
            try
            {
                string fileName = FileManager.GetFilePath(p_fileInfo);
                if (File.Exists(fileName))
                    l_dsInfo = excelDoc.ReadExcelSheet(fileName, true, p_numericColumns);
                FileManager.RemoveFile(new FileInformation { FileName = fileName });
            }
            catch
            {
                throw;
            }
            return l_dsInfo;
        }
    }
}
