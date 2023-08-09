using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Globalization;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Configuration;
using ICSharpCode.SharpZipLib.Zip;
using Microsoft.AspNetCore.Http;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Hosting.Internal;
using System.Data.Common;
using System.Data;
using System.Data.OleDb;

namespace Vlims.DMS.Entities
{
    public class FileManager
    {

        /// <summary>
        /// Gets the file path by creating the directory
        /// </summary>
        /// <param name="p_file"></param>
        /// <returns></returns>
        public static string GetFilePath(IFormFile p_file)
        {
            string path = string.Empty;
            try
            {
                if (p_file != null)
                {
                    //_logWriter?.LogError(LoggerEnum.Error, null, "fileisnotnull", "Common");
                    //_logWriter?.LogError(LoggerEnum.Error, null, "getdirectory" + Directory.GetCurrentDirectory(), "Common");
                    path = Path.Combine(Directory.GetCurrentDirectory(), "TempFiles");
                    //_logWriter?.LogError(LoggerEnum.Error, null, Directory.GetCurrentDirectory(), "Common");
                    //_logWriter?.LogError(LoggerEnum.Error, null, path, "Common");
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);                   
                    //_logWriter?.LogError(LoggerEnum.Error, null, "path crated", "Common");
                    path += "/" + Guid.NewGuid().ToString() + Path.GetExtension(p_file.FileName);
                    //_logWriter?.LogError(LoggerEnum.Error, null, "duplicate path check", "Common");
                    //_logWriter?.LogError(LoggerEnum.Error, null, path, "Common");
                    if (File.Exists(path))
                        File.Delete(path);
                    using var stream = File.Create(path);
                    p_file.CopyTo(stream);
                    //_logWriter?.LogError(LoggerEnum.Error, null, "filecopied", "Common");
                }
                else
                {
                    //_logWriter?.LogError(LoggerEnum.Error, null, "fileisnull", "Common");
                    return null;
                }
            }
            catch (Exception ex)
            {
                //_logWriter?.LogError(LoggerEnum.Error, ex, "GetFilePath(p_file:"+ p_file + ",_logWriter:"+ _logWriter + ")", "Model");
                //throw ExceptionHelper.WriteLog(ex, Constants.file, System.Reflection.MethodBase.GetCurrentMethod().Name);
            }
            return path;
        }


        public static string SaveFile(IFormFile fileInfo, string rootDirectory, bool isWebJob = false)
        {
            string fileName = string.Empty;
            string directory = string.Empty;
            string strTempFilePath = string.Empty, strUploadFilePath = string.Empty;
            if (isWebJob)
            {
                string tempDir = ConfigurationManager.AppSettings.Get("TempFiles") ?? @"D:\home\data\";
                directory = Path.Combine(tempDir, "Import\\");
                //directory = directory + "\\Plan Content";
            }
            //else if (fileInfo.IsTemporaryFile)
            //{
            //    strTempFilePath = Hosting.HostingEnvironment.ContentRootPath + @"UploadedFiles\Temporary Files\";
            //    directory = Path.Combine(rootDirectory, strTempFilePath);
            //}
            else if (true)
            {
                strTempFilePath = Hosting.HostingEnvironment.ContentRootPath + @"UploadedFiles\Temporary Files\";
                directory = Path.Combine(rootDirectory, strTempFilePath);
            }
            else
            {
                strUploadFilePath = Hosting.HostingEnvironment.ContentRootPath + @"UploadedFiles\";
                directory = Path.Combine(rootDirectory, strUploadFilePath);
            }
            fileName = directory + Guid.NewGuid().ToString() + Path.GetExtension(fileInfo.FileName);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
            else
            {
                RemoveAllFileFrmDir(directory);
            }

            //WriteByteArrayToFile(fileInfo.Content, fileName);
            if (File.Exists(fileName))
                File.Delete(fileName);
            using var stream = File.Create(fileName);
            fileInfo.CopyTo(stream);
            return fileName;
            #region oldSourceCode
            //string fileName = string.Empty;
            //string directory = string.Empty;
            //if (fileInfo.IsTemporaryFile)
            //{
            //    directory = Path.Combine(rootDirectory, ConfigurationSettings.AppSettings["TempFiles"]);
            //}
            //else
            //{
            //    directory = Path.Combine(rootDirectory, ConfigurationSettings.AppSettings["UploadedFiles"]);
            //}
            //fileName = directory + Guid.NewGuid().ToString() +Path.GetExtension(fileInfo.FileName);
            //if (!Directory.Exists(directory))
            //{
            //    Directory.CreateDirectory(directory);
            //}
            //WriteByteArrayToFile(fileInfo.Content, fileName);
            //return fileName;
            #endregion
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileInfo"></param>
        /// <param name="rootDirectory"></param>
        /// <returns></returns>
        public static string SaveFileWebJob(FileInformation fileInfo, string rootDirectory)
        {
            string fileName = string.Empty;
            fileName = rootDirectory + "\\" + Guid.NewGuid().ToString("N").Substring(0, 4) + Path.GetExtension(fileInfo.FileName);
            if (!Directory.Exists(rootDirectory))
            {
                Directory.CreateDirectory(rootDirectory);
            }
            else
            {
                RemoveAllFileFrmDir(rootDirectory);
            }

            WriteByteArrayToFile(fileInfo.Content, fileName);
            return fileName;
        }

        public static void RemoveAllFileFrmDir(string directory)
        {
            try
            {
                string[] strFiles = Directory.GetFiles(directory);
                if (strFiles != null && strFiles.Length > 0)
                {
                    foreach (string strFile in strFiles)
                    {
                        File.Delete(strFile);
                    }
                }

                string[] strDirectories = Directory.GetDirectories(directory);
                if (strDirectories != null && strDirectories.Length > 0)
                {
                    foreach (string strDirectory in strDirectories)
                    {
                        if (!strDirectory.Contains("Temporary Files"))
                            Directory.Delete(strDirectory, true);
                    }
                }
            }
            catch
            { throw; }
        }

        public static bool RemoveFile(FileInformation fileInfo)
        {
            try
            {
                if (File.Exists(fileInfo.FileName))
                {
                    File.Delete(fileInfo.FileName);
                }
            }
            catch { throw; }
            return true;
        }
        private static bool WriteByteArrayToFile(byte[] buff, string fileName)
        {
            bool response = false;

            try
            {
                FileStream fs = new FileStream(fileName, FileMode.Create, FileAccess.ReadWrite);
                BinaryWriter bw = new BinaryWriter(fs);
                bw.Write(buff);
                bw.Close(); //Thanks Karlo for pointing out!
                response = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return response;
        }
        public static object ReadFile(string fileName)
        {
            IFileReader reader = FileFactory.GetReader(fileName);
            if (reader != null)
            {
                return reader.ReadFile(fileName);
            }
            else
                throw new Exception("Cannot find Reader for the file type supplied");
        }

        public static object ReadMultiDimensionFile(string fileName)
        {
            IFileReader reader = FileFactory.GetReader(fileName);
            if (reader != null)
            {
                return reader.ReadMultiDimensionFile(fileName);
            }
            else
                throw new Exception("Cannot find Reader for the file type supplied");
        }
        public static object ReadMergeTemplateFile(string fileName)
        {
            IFileReader reader = FileFactory.GetReader(fileName);
            if (reader != null)
            {
                return reader.ReadMergeTemplateFile(fileName);
            }
            else
                throw new Exception("Cannot find Reader for the file type supplied");
        }
        public static object ReadMergeTemplateFile(string fileName, string sheetname)
        {
            IFileReader reader = FileFactory.GetReader(fileName);
            if (reader != null)
            {
                return reader.ReadMergeTemplateFile(fileName, sheetname);
            }
            else
                throw new Exception("Cannot find Reader for the file type supplied");
        }
        public static object ReadMergeVariantTemplateFile(string fileName)
        {
            IFileReader reader = FileFactory.GetReader(fileName);
            if (reader != null)
            {
                return reader.ReadMergeVariantTemplateFile(fileName);
            }
            else
                throw new Exception("Cannot find Reader for the file type supplied");
        }
        public static object ReadMultiVariantTemplateFile(string fileName)
        {
            IFileReader reader = FileFactory.GetReader(fileName);
            if (reader != null)
            {
                return reader.ReadMultiVariantTemplateFile(fileName);
            }
            else
                throw new Exception("Cannot find Reader for the file type supplied");
        }
        /// <summary>
        /// Saves pdf report and returns its file Name
        /// </summary>
        /// <param name="ReportData">ReportData</param>
        /// <returns>fileName</returns>
       
        /// <summary>
        /// Converts byte array to file
        /// </summary>
        /// <param name="_FileName">_FileName</param>
        /// <param name="_ByteArray">_ByteArray</param>
        /// <returns>true/false</returns>
        private static bool ByteArrayToFile(string _FileName, byte[] _ByteArray)
        {
            try
            {
                // Open file for reading
                System.IO.FileStream _FileStream = new System.IO.FileStream(_FileName, System.IO.FileMode.Create, System.IO.FileAccess.Write);
                // Writes a block of bytes to this stream using data from a byte array.
                _FileStream.Write(_ByteArray, 0, _ByteArray.Length);
                // close file stream
                _FileStream.Close();
                return true;
            }
            catch { throw; }
        }
        /// <summary>
        /// Deletes the reports older than 7 days
        /// </summary>
        /// <param name="rootPath">rootPath</param>
        private static void DeleteOldReports(string rootPath)
        {
            try
            {
                //Delete older files or folders code
                List<string> paths = GetSubdirectoriesContainingOnlyFiles(rootPath).ToList();
                if (paths != null && paths.Count > 0)
                    foreach (var path1 in paths)
                    {
                        string dirInfo = Path.GetFileName(path1);
                        List<string> dates = dirInfo.Split('-').ToList();
                        string datetime = string.Empty;
                        foreach (string date in dates)
                        {
                            if (date.Length == 1)
                                datetime = datetime + "0" + date;
                            else
                                datetime = datetime + date;
                        }
                        DateTime reportDate = DateTime.ParseExact(datetime, "MMddyyyy", CultureInfo.InvariantCulture);
                        if ((DateTime.Now - reportDate).TotalDays >= 7)
                        {
                            var deleteDir = new DirectoryInfo(@path1);
                            deleteDir.Delete(true);
                        }
                    }
            }
            catch { throw; }
        }
        /// <summary>
        /// Returns the last folder or file name of the path
        /// </summary>
        /// <param name="path">path</param>
        /// <returns>IEnumerable</returns>
        static IEnumerable<string> GetSubdirectoriesContainingOnlyFiles(string path)
        {
            return from subdirectory in Directory.GetDirectories(path, "*", SearchOption.AllDirectories)
                   where Directory.GetDirectories(subdirectory).Length == 0
                   select subdirectory;
        }

        #region Sheet Methods
        public static void DeleteAWorkSheet(SpreadsheetDocument document, string sheetToDelete)
        {
            string Sheetid = "";
            //Open the workbook
            //using (SpreadsheetDocument document = SpreadsheetDocument.Open(fileName, true))
            //{
            WorkbookPart wbPart = document.WorkbookPart;

            // Get the pivot Table Parts
            IEnumerable<PivotTableCacheDefinitionPart> pvtTableCacheParts = wbPart.PivotTableCacheDefinitionParts;
            Dictionary<PivotTableCacheDefinitionPart, string> pvtTableCacheDefinationPart = new Dictionary<PivotTableCacheDefinitionPart, string>();
            foreach (PivotTableCacheDefinitionPart Item in pvtTableCacheParts)
            {
                PivotCacheDefinition pvtCacheDef = Item.PivotCacheDefinition;
                //Check if this CacheSource is linked to SheetToDelete
                var pvtCahce = pvtCacheDef.Descendants<CacheSource>().Where(s => s.WorksheetSource.Sheet == sheetToDelete);
                if (pvtCahce.Count() > 0)
                    pvtTableCacheDefinationPart.Add(Item, Item.ToString());
            }
            foreach (var Item in pvtTableCacheDefinationPart)
            {
                wbPart.DeletePart(Item.Key);
            }
            //Get the SheetToDelete from workbook.xml
            Sheet theSheet = wbPart.Workbook.Descendants<Sheet>().Where(s => s.Name == sheetToDelete).FirstOrDefault();

            //Store the SheetID for the reference
            Sheetid = theSheet.SheetId;

            // Remove the sheet reference from the workbook.
            WorksheetPart worksheetPart = (WorksheetPart)(wbPart.GetPartById(theSheet.Id));
            theSheet.Remove();
            // Delete the worksheet part.
            wbPart.DeletePart(worksheetPart);
            //Get the DefinedNames
            var definedNames = wbPart.Workbook.Descendants<DefinedNames>().FirstOrDefault();
            if (definedNames != null)
            {
                foreach (DefinedName Item in definedNames)
                {
                    // This condition checks to delete only those names which are part of Sheet in question
                    if (Item.Text.Contains(sheetToDelete + "!"))
                        Item.Remove();
                }
            }
            // Get the CalculationChainPart 
            //Note: An instance of this part type contains an ordered set of references to all cells in all worksheets in the 
            //workbook whose value is calculated from any formula
            CalculationChainPart calChainPart;
            calChainPart = wbPart.CalculationChainPart;
            if (calChainPart != null)
            {
                var calChainEntries = calChainPart.CalculationChain.Descendants<CalculationCell>().Where(c => c.SheetId == Sheetid);
                foreach (CalculationCell Item in calChainEntries)
                {
                    Item.Remove();
                }
                if (calChainPart.CalculationChain.Count() == 0)
                {
                    wbPart.DeletePart(calChainPart);
                }
            }

            // Save the workbook.
            wbPart.Workbook.Save();
        }
        public static WorksheetPart InsertWorksheet(WorkbookPart workbookPart, string sheetName)
        {
            // Add a new worksheet part to the workbook.            
            WorksheetPart newWorksheetPart = workbookPart.AddNewPart<WorksheetPart>();
            newWorksheetPart.Worksheet = new DocumentFormat.OpenXml.Spreadsheet.Worksheet(new SheetData());
            newWorksheetPart.Worksheet.Save();
            try
            {
                DocumentFormat.OpenXml.Spreadsheet.Sheets sheets = workbookPart.Workbook.GetFirstChild<DocumentFormat.OpenXml.Spreadsheet.Sheets>();
                string relationshipId = workbookPart.GetIdOfPart(newWorksheetPart);

                // Get a unique ID for the new sheet.
                uint sheetId = 1;
                if (sheets.Elements<Sheet>().Count() > 0)
                {
                    sheetId = sheets.Elements<Sheet>().Select(s => s.SheetId.Value).Max() + 1;
                }

                // Append the new worksheet and associate it with the workbook.
                Sheet sheet = new Sheet() { Id = relationshipId, SheetId = sheetId, Name = sheetName };
                sheets.Append(sheet);
                workbookPart.Workbook.Save();
            }
            catch
            {
                throw;
            }
            return newWorksheetPart;
        }

        #endregion
        /// <summary>
        /// Saves initative attachment and returns folder name
        /// </summary>
        /// <param name="p_FileName"></param>
        /// <param name="p_Content">p_Content</param>
        /// <returns>foldername</returns>
        public static string SaveAttachment(string p_FileName, byte[] p_Content)
        {
            try
            {
                string rootPath = Hosting.HostingEnvironment.ContentRootPath + "Attachments";
                DirectoryInfo directory = new DirectoryInfo(rootPath);
                if (!directory.Exists.Equals(rootPath))
                    directory.Create();
                var id = Guid.NewGuid();
                string path = rootPath;
                path = Path.Combine(path, id.ToString());
                DirectoryInfo dc = new DirectoryInfo(path);
                if (!dc.Exists.Equals(path))
                    dc.Create();
                string filePath = Path.Combine(path, p_FileName);
                if (!File.Exists(filePath))
                    ByteArrayToFile(filePath, p_Content.ToArray());
                else
                    new Exception("FilePath does not exists");
                return id.ToString();
            }
            catch (Exception ex) { throw ex; }

        }
        public static string p = string.Empty;
        /// <summary>
        /// Saves Imported ZIP file and returns the path
        /// </summary>
        /// <param name="pricingReportData">pricingReportData</param>
        /// <returns>path</returns>
        public static string SaveZipFile(byte[] pricingReportData, string p_path)
        {
            string p_rootPath = Hosting.HostingEnvironment.ContentRootPath + "ERC";
            //DeleteOldContent(p_rootPath);
            string filePath = string.Empty; string path = string.Empty;
            try
            {
                if (!string.IsNullOrEmpty(p_path))
                {
                    DirectoryInfo dc = new DirectoryInfo(p_path);
                    if (!dc.Exists.Equals(p_path))
                        dc.Create();
                    filePath = Path.Combine(p_path, "PlanVersion.zip");
                    if (!File.Exists(filePath))
                    {
                        // File.Create(filePath);
                    }
                    if (ByteArrayToFile(filePath, pricingReportData.ToArray()))
                    {
                        //_doc = objBRAdo.UploadAttachment(_doc);
                        //doc = _Entity.Translate<AttachmentEntity>(_doc);
                    }
                    return p = p_path;
                }
                else
                {
                    string rootPath = Hosting.HostingEnvironment.ContentRootPath + "ERC";
                    DirectoryInfo directory = new DirectoryInfo(rootPath);
                    if (!directory.Exists.Equals(rootPath))
                        directory.Create();
                    var id = DateTime.Now.Ticks.ToString();
                    path = rootPath;
                    path = Path.Combine(path, id.ToString());
                    DirectoryInfo dc = new DirectoryInfo(path);
                    if (!dc.Exists.Equals(path))
                        dc.Create();
                    filePath = Path.Combine(path, "Business Object Model.zip");
                    if (!File.Exists(filePath))
                    {
                        // File.Create(filePath);
                    }
                    if (ByteArrayToFile(filePath, pricingReportData.ToArray()))
                    {
                        //_doc = objBRAdo.UploadAttachment(_doc);
                        //doc = _Entity.Translate<AttachmentEntity>(_doc);
                    }
                    //DeleteOldContent(rootPath);
                    return p = path;
                }


            }
            catch
            {
                throw;
            }
        }


        public static string SavezipFile(byte[] pricingReportData)
        {
            p = string.Empty; string filePath = string.Empty; string path = string.Empty;
            try
            {
                string rootPath = Hosting.HostingEnvironment.ContentRootPath + "ERC";
                DirectoryInfo directory = new DirectoryInfo(rootPath);
                if (!directory.Exists.Equals(rootPath))
                    directory.Create();
                var id = DateTime.Now.Ticks.ToString();
                path = rootPath;
                path = Path.Combine(path, id.ToString());
                DirectoryInfo dc = new DirectoryInfo(path);
                if (!dc.Exists.Equals(path))
                    dc.Create();
                filePath = Path.Combine(path, "PlanVersion.zip");

                if (!File.Exists(filePath))
                {
                    // File.Create(filePath);
                }
                if (ByteArrayToFile(filePath, pricingReportData.ToArray()))
                {
                    //_doc = objBRAdo.UploadAttachment(_doc);
                    //doc = _Entity.Translate<AttachmentEntity>(_doc);
                }
                p = path;

            }
            catch
            {
                throw;
            }
            return p;
        }
        /// <summary>
        /// Delete old folders from ERC folder.
        /// </summary>
        /// <param name="rootPath"></param>
        public static void DeleteOldContent(string rootPath)
        {
            try
            {
                DirectoryInfo dir = new DirectoryInfo(rootPath);
                var directories = dir.GetDirectories();
                foreach (var item in directories)
                {
                    string filePath = Convert.ToString(dir) + @"\" + item.ToString();
                    bool directoryExists = Directory.Exists(filePath);
                    if (directoryExists)
                        Directory.Delete(filePath, true);
                    // item.Delete(true);
                }
                #region Commented Region
                //Delete older files or folders code
                //List<string> paths = GetSubdirectoriesContainingOnlyFiles(rootPath).ToList();
                //if (paths != null && paths.Count > 0)
                //    foreach (var path1 in paths)
                //    {
                //        var deleteDir = new DirectoryInfo(path1);
                //        deleteDir.Delete(true);
                //    } 
                #endregion
            }
            catch { throw; }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="InputPathOfZipFile"></param>
        /// <returns></returns>
        public static string UnZipFile(string InputPathOfZipFile)
        {
            string fileName = string.Empty;
            try
            {
                int i = 0;
                if (File.Exists(InputPathOfZipFile))
                {
                    string baseDirectory = Path.GetDirectoryName(InputPathOfZipFile);

                    using (ZipInputStream ZipStream = new

ZipInputStream(File.OpenRead(InputPathOfZipFile)))
                    {
                        ZipEntry theEntry;
                        while ((theEntry = ZipStream.GetNextEntry()) != null)
                        {
                            if (theEntry.IsFile)
                            {
                                if (theEntry.Name != "")
                                {
                                    string strNewFile = @"" + baseDirectory + @"\" +

theEntry.Name;
                                    if (File.Exists(strNewFile))
                                        continue;
                                    using (FileStream streamWriter = File.Create(strNewFile))
                                    {
                                        int size = 2048;
                                        byte[] data = new byte[2048];
                                        while (true)
                                        {
                                            size = ZipStream.Read(data, 0, data.Length);
                                            if (size > 0)
                                                streamWriter.Write(data, 0, size);
                                            else
                                                break;
                                        }
                                        streamWriter.Close();
                                    }
                                }
                            }
                            else if (theEntry.IsDirectory)
                            {
                                if (i == 0)
                                    fileName = theEntry.Name;
                                string strNewDirectory = @"" + baseDirectory + @"\" +

theEntry.Name;
                                if (!Directory.Exists(strNewDirectory))
                                {
                                    Directory.CreateDirectory(strNewDirectory);
                                }
                                i++;
                            }
                        }
                        ZipStream.Close();
                    }
                }
            }
            catch
            {
                throw;
            }
            return fileName;
        }
        /// <summary>
        /// Deletes attachment physical file on disk
        /// </summary>
        /// <param name="p_attachementID">p_attachementID</param>
        public static void DeleteAttachment(string p_attachementID)
        {
            DirectoryInfo dci = new DirectoryInfo(Hosting.HostingEnvironment.ContentRootPath + "Attachments\\" + p_attachementID);
            if (dci.Exists)
            {
                dci.Delete(true);
            }
        }
    }
    public class FileInformation
    {
        [DataMember(IsRequired = false)]
        public string FileName { get; set; }
        [DataMember(IsRequired = false)]
        public byte[] Content { get; set; }
        [DataMember(IsRequired = true)]
        public bool IsTemporaryFile { get; set; }
        [DataMember(IsRequired = false)]
        public float Version { get; set; }

    }
    internal interface IFileReader
    {
        object ReadFile(string fileName);
        object ReadMultiDimensionFile(string filename);
        object ReadMergeTemplateFile(string fileName);
        object ReadMergeTemplateFile(string fileName, string sheetname);
        object ReadMergeVariantTemplateFile(string filename);
        object ReadMultiVariantTemplateFile(string filename);
    }

    public sealed class Hosting
    {
        private Hosting() { }
        static Hosting() { }
        private static readonly HostingEnvironment HostingEnvironmentobj = new HostingEnvironment();
        /// <summary>
        /// Hosting environment object
        /// </summary>
        public static HostingEnvironment HostingEnvironment
        {
            get
            {
                return HostingEnvironmentobj;
            }
        }
    }

    internal static class FileFactory
    {
        internal static IFileReader GetReader(string fileName)
        {
            string extension = Path.GetExtension(fileName);
            switch (extension)
            {
                case ".xlsx":
                    return new ExcelReader();
                default:
                    return null;
            }
        }
        internal static IFileWriter GetWriter(string fileName)
        {
            string extension = Path.GetExtension(fileName);
            switch (extension)
            {
                case ".xls":
                case ".xlsx":
                    return new ExcelWriter();
                default:
                    return null;
            }
        }
    }

    internal class ExcelReader : IFileReader
    {
        #region IFileReader Members
        public object ReadFile(string fileName)
        {
            //return ReadInterop(fileName);
            return ReadOleDB(fileName);
        }
        public object ReadMultiDimensionFile(string fileName)
        {
            //return ReadInterop(fileName);
            return ReadMultiDimensionOleDB(fileName);
        }
        public object ReadMergeTemplateFile(string fileName)
        {
            return ReadMergeTemplateOleDB(fileName);
        }
        public object ReadMergeTemplateFile(string fileName, string sheetname)
        {
            return ReadMergeTemplateOleDB(fileName, sheetname);
        }
        public object ReadMergeVariantTemplateFile(string fileName)
        {
            return ReadMergeVariantTemplateOleDB(fileName);
        }
        public object ReadMultiVariantTemplateFile(string fileName)
        {
            return ReadMultiVariantTemplateOleDB(fileName);
        }

        #endregion
        private DataSet ReadOleDB(string fileName)
        {
            DataSet ds = new DataSet();
            System.Data.DataTable tempTable = new System.Data.DataTable();
            String ConnectionString = string.Empty;

            switch (Path.GetExtension(fileName))
            {
                case ".xls":
                    ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 8.0;HDR=No;IMEX=1;\"";
                    break;
                case ".xlsx":
                    ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 12.0 Xml;HDR=No;IMEX=1;\"";
                    break;
                default:
                    return null;
            }
            DbProviderFactory factory = DbProviderFactories.GetFactory("System.Data.OleDb");
            OleDbConnection connection = (OleDbConnection)factory.CreateConnection();
            connection.ConnectionString = ConnectionString;
            if (connection.State == ConnectionState.Open)
            {
                connection.Close();
            }
            connection.Open();

            System.Data.DataTable dtSheets = connection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            List<string> excelSheets = new List<string>();
            int k = 0;
            foreach (DataRow row in dtSheets.Rows)
            {
                if (!row["TABLE_NAME"].ToString().EndsWith("_"))
                    excelSheets.Add(row["TABLE_NAME"].ToString());
                k++;
            }
            // Loop through all of the sheets
            using (connection)
            {
                using (OleDbCommand command = connection.CreateCommand())
                {
                    for (int j = 0; j < excelSheets.Count; j++)
                    {
                        System.Data.DataTable dtSheet = new System.Data.DataTable(excelSheets[j].Replace("$", ""));
                        command.CommandText = "SELECT * FROM [" + excelSheets[j] + "]";
                        if (connection.State != ConnectionState.Open)
                            connection.Open();
                        using (DbDataReader dr = command.ExecuteReader())
                        {
                            for (int i = 0; dr.Read(); i++)
                            {
                                if (i == 0)
                                {
                                    for (int f = 0; f < dr.FieldCount; f++)
                                    {
                                        dtSheet.Columns.Add(dr[f].ToString());
                                    }
                                }
                                else
                                {
                                    DataRow row = dtSheet.NewRow();
                                    for (int f = 0; f < dr.FieldCount; f++)
                                    {
                                        row[f] = dr[f];

                                    }
                                    dtSheet.Rows.Add(row);
                                }
                            }
                        }
                        ds.Tables.Add(dtSheet);
                    }
                }
            }
            return ds;
        }
        private DataSet ReadMultiDimensionOleDB(string fileName)
        {
            DataSet ds1 = new DataSet();
            System.Data.DataTable tempTable = new System.Data.DataTable();
            String ConnectionString = string.Empty;

            switch (Path.GetExtension(fileName))
            {
                case ".xls":
                    ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 8.0;HDR=No;IMEX=1;\"";
                    break;
                case ".xlsx":
                    ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 12.0 Xml;HDR=No;IMEX=1;\"";
                    break;
                default:
                    return null;
            }
            DbProviderFactory factory = DbProviderFactories.GetFactory("System.Data.OleDb");
            OleDbConnection connection = (OleDbConnection)factory.CreateConnection();
            connection.ConnectionString = ConnectionString;
            if (connection.State == ConnectionState.Open)
            {
                connection.Close();
            }
            connection.Open();

            System.Data.DataTable dtSheets = connection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            List<string> excelSheets = new List<string>();
            int k = 0;
            foreach (DataRow row in dtSheets.Rows)
            {
                if (!row["TABLE_NAME"].ToString().EndsWith("_"))
                    excelSheets.Add(row["TABLE_NAME"].ToString());
                k++;
            }
            // Loop through all of the sheets
            using (connection)
            {
                using (OleDbCommand command = connection.CreateCommand())
                {
                    for (int j = 0; j < excelSheets.Count; j++)
                    {
                        System.Data.DataTable dtSheet = new System.Data.DataTable(excelSheets[j].Replace("$", ""));
                        command.CommandText = "SELECT * FROM [" + excelSheets[j] + "]";
                        if (connection.State != ConnectionState.Open)
                            connection.Open();
                        OleDbDataAdapter oleda = new OleDbDataAdapter();
                        DataSet ds = new DataSet();
                        oleda.SelectCommand = command;
                        oleda.Fill(ds, "Table");
                        return ds;
                    }
                }
            }
            return ds1;
        }
        private DataSet ReadMergeTemplateOleDB(string fileName)
        {
            DataSet ds = new DataSet();
            System.Data.DataTable tempTable = new System.Data.DataTable();
            string ConnectionString;
            switch (Path.GetExtension(fileName))
            {
                case ".xls":
                    ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 8.0;HDR=No;IMEX=1;\"";
                    break;
                case ".xlsx":
                    ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 12.0 Xml;HDR=No;IMEX=1;\"";
                    break;
                default:
                    return null;
            }
            DbProviderFactory factory = DbProviderFactories.GetFactory("System.Data.OleDb");
            OleDbConnection connection = (OleDbConnection)factory.CreateConnection();
            connection.ConnectionString = ConnectionString;
            if (connection.State == ConnectionState.Open)
            {
                connection.Close();
            }
            connection.Open();

            System.Data.DataTable dtSheets = connection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            List<string> excelSheets = new List<string>();
            int k = 0;
            foreach (DataRow row in dtSheets.Rows)
            {
                if (!row["TABLE_NAME"].ToString().EndsWith("_"))
                    excelSheets.Add(row["TABLE_NAME"].ToString());
                k++;
            }
            // Loop through all of the sheets
            using (connection)
            {
                using (OleDbCommand command = connection.CreateCommand())
                {
                    for (int j = 0; j < excelSheets.Count; j++)
                    {
                        bool defaultOperator = true;
                        System.Data.DataTable dtSheet = new System.Data.DataTable(excelSheets[j].Replace("$", ""));
                        command.CommandText = "SELECT * FROM [" + excelSheets[j] + "]";
                        if (connection.State != ConnectionState.Open)
                            connection.Open();
                        using (DbDataReader dr = command.ExecuteReader())
                        {
                            for (int i = 0; dr.Read(); i++)
                            {
                                if (i == 0)
                                {
                                    string prevoiouscolumn = string.Empty;
                                    for (int f = 0; f < dr.FieldCount; f++)
                                    {
                                        if (!string.IsNullOrEmpty(dr[f].ToString().Trim()))
                                        {
                                            if (dtSheet.Columns.Contains(dr[f].ToString().Trim()))
                                            {
                                                throw new Exception("Duplicate header name exist.");
                                            }
                                            dtSheet.Columns.Add(dr[f].ToString().Trim());
                                            prevoiouscolumn = dr[f].ToString().Trim();
                                        }
                                        else
                                        {
                                            if (string.IsNullOrEmpty(prevoiouscolumn.Trim()) || dtSheet.Columns.Contains("Column" + prevoiouscolumn.Trim()))
                                            {
                                                throw new Exception("Header name missing.");
                                            }
                                            dtSheet.Columns.Add("Column" + prevoiouscolumn.Trim());
                                            defaultOperator = false;
                                        }
                                    }
                                }
                                else if (i != 1 && defaultOperator == false)
                                {
                                    DataRow row = dtSheet.NewRow();
                                    for (int f = 0; f < dr.FieldCount; f++)
                                    {
                                        row[f] = dr[f];

                                    }
                                    dtSheet.Rows.Add(row);
                                }
                                else if (defaultOperator)
                                {
                                    DataRow row = dtSheet.NewRow();
                                    for (int f = 0; f < dr.FieldCount; f++)
                                    {
                                        row[f] = dr[f];

                                    }
                                    dtSheet.Rows.Add(row);
                                }
                            }
                        }
                        ds.Tables.Add(dtSheet);
                    }
                }
            }
            return ds;
        }
        private DataSet ReadMergeVariantTemplateOleDB(string fileName)
        {
            DataSet ds = new DataSet();
            System.Data.DataTable tempTable = new System.Data.DataTable();
            String ConnectionString = string.Empty;

            switch (Path.GetExtension(fileName))
            {
                case ".xls":
                    ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 8.0;HDR=No;IMEX=1;\"";
                    break;
                case ".xlsx":
                    ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 12.0 Xml;HDR=No;IMEX=1;\"";
                    break;
                default:
                    return null;
            }
            DbProviderFactory factory = DbProviderFactories.GetFactory("System.Data.OleDb");
            OleDbConnection connection = (OleDbConnection)factory.CreateConnection();
            connection.ConnectionString = ConnectionString;
            if (connection.State == ConnectionState.Open)
            {
                connection.Close();
            }
            connection.Open();

            System.Data.DataTable dtSheets = connection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            List<string> excelSheets = new List<string>();
            int k = 0;
            foreach (DataRow row in dtSheets.Rows)
            {
                if (!row["TABLE_NAME"].ToString().EndsWith("_"))
                    excelSheets.Add(row["TABLE_NAME"].ToString());
                k++;
            }
            // Loop through all of the sheets
            using (connection)
            {
                using (OleDbCommand command = connection.CreateCommand())
                {
                    for (int j = 0; j < excelSheets.Count; j++)
                    {
                        System.Data.DataTable dtSheet = new System.Data.DataTable(excelSheets[j].Replace("$", ""));
                        command.CommandText = "SELECT * FROM [" + excelSheets[j] + "]";
                        if (connection.State != ConnectionState.Open)
                            connection.Open();
                        using (DbDataReader dr = command.ExecuteReader())
                        {
                            if (excelSheets[j].ToString() != "Variants$")
                            {
                                for (int i = 0; dr.Read(); i++)
                                {
                                    if (i == 0)
                                    {
                                        string prevoiouscolumn = string.Empty;
                                        for (int f = 0; f < dr.FieldCount; f++)
                                        {
                                            if (!string.IsNullOrEmpty(dr[f].ToString().Trim()))
                                            {
                                                if (dtSheet.Columns.Contains(dr[f].ToString().Trim()))
                                                {
                                                    throw new Exception("Duplicate header name exist.");
                                                }
                                                dtSheet.Columns.Add(dr[f].ToString().Trim());
                                                prevoiouscolumn = dr[f].ToString().Trim();
                                            }
                                            else
                                            {
                                                if (string.IsNullOrEmpty(prevoiouscolumn.Trim()) || dtSheet.Columns.Contains("Column" + prevoiouscolumn.Trim()))
                                                {
                                                    throw new Exception("Header name missing.");
                                                }
                                                dtSheet.Columns.Add("Column" + prevoiouscolumn.Trim());
                                            }
                                        }
                                    }
                                    else if (i != 1)
                                    {
                                        DataRow row = dtSheet.NewRow();
                                        for (int f = 0; f < dr.FieldCount; f++)
                                        {
                                            row[f] = dr[f];

                                        }
                                        dtSheet.Rows.Add(row);
                                    }
                                }
                            }
                            else
                            {
                                for (int i = 0; dr.Read(); i++)
                                {
                                    if (i == 0)
                                    {
                                        for (int f = 0; f < dr.FieldCount; f++)
                                        {
                                            dtSheet.Columns.Add(dr[f].ToString());
                                        }
                                    }
                                    else
                                    {
                                        DataRow row = dtSheet.NewRow();
                                        for (int f = 0; f < dr.FieldCount; f++)
                                        {
                                            row[f] = dr[f];

                                        }
                                        dtSheet.Rows.Add(row);
                                    }
                                }
                            }
                        }
                        ds.Tables.Add(dtSheet);
                    }
                }
            }
            return ds;
        }
        private List<DataSet> ReadMultiVariantTemplateOleDB(string fileName)
        {
            List<DataSet> ds = new List<DataSet>();
            List<DataSet> ds2 = new List<DataSet>();
            DataSet tempds = null;
            System.Data.DataTable tempTable = new System.Data.DataTable();
            String ConnectionString = string.Empty;

            switch (Path.GetExtension(fileName))
            {
                case ".xls":
                    ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 8.0;HDR=No;IMEX=1;\"";
                    break;
                case ".xlsx":
                    ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 12.0 Xml;HDR=No;IMEX=1;\"";
                    break;
                default:
                    return null;
            }
            DbProviderFactory factory = DbProviderFactories.GetFactory("System.Data.OleDb");
            OleDbConnection connection = (OleDbConnection)factory.CreateConnection();
            connection.ConnectionString = ConnectionString;
            if (connection.State == ConnectionState.Open)
            {
                connection.Close();
            }
            connection.Open();

            System.Data.DataTable dtSheets = connection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            List<string> excelSheets = new List<string>();
            int k = 0;
            foreach (DataRow row in dtSheets.Rows)
            {
                if (!row["TABLE_NAME"].ToString().EndsWith("_"))
                    excelSheets.Add(row["TABLE_NAME"].ToString());
                k++;
            }
            // Loop through all of the sheets
            using (connection)
            {
                using (OleDbCommand command = connection.CreateCommand())
                {
                    for (int j = 0; j < excelSheets.Count; j++)
                    {

                        if (excelSheets[j].ToString() == "Variants$")
                        {
                            tempds = new DataSet();
                            System.Data.DataTable dtSheet = new System.Data.DataTable(excelSheets[j].Replace("$", ""));
                            command.CommandText = "SELECT * FROM [" + excelSheets[j] + "]";
                            if (connection.State != ConnectionState.Open)
                                connection.Open();
                            using (DbDataReader dr = command.ExecuteReader())
                            {
                                for (int i = 0; dr.Read(); i++)
                                {
                                    if (i == 0)
                                    {
                                        for (int f = 0; f < dr.FieldCount; f++)
                                        {
                                            dtSheet.Columns.Add(dr[f].ToString());
                                        }
                                    }
                                    else
                                    {
                                        DataRow row = dtSheet.NewRow();
                                        for (int f = 0; f < dr.FieldCount; f++)
                                        {
                                            row[f] = dr[f];

                                        }
                                        dtSheet.Rows.Add(row);
                                    }
                                }

                            }
                            tempds.Tables.Add(dtSheet);
                        }
                        else
                        {
                            //DataSet tempds = new DataSet();
                            System.Data.DataTable dtSheet = new System.Data.DataTable(excelSheets[j].Replace("$", ""));
                            command.CommandText = "SELECT * FROM [" + excelSheets[j] + "]";
                            if (connection.State != ConnectionState.Open)
                                connection.Open();

                            OleDbDataAdapter oleda = new OleDbDataAdapter();
                            oleda.SelectCommand = command;
                            DataSet tempds1 = new DataSet();
                            oleda.Fill(tempds1, excelSheets[j].Replace("$", ""));
                            ds2.Add(tempds1);
                        }
                    }
                }
            }
            ds.Add(tempds);
            ds.AddRange(ds2);
            return ds;
        }
        private DataSet ReadMergeTemplateOleDB(string fileName, string sheetname)
        {
            DataSet ds1 = new DataSet();
            System.Data.DataTable tempTable = new System.Data.DataTable();
            String ConnectionString = string.Empty;

            switch (Path.GetExtension(fileName))
            {
                case ".xls":
                    ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 8.0;HDR=No;IMEX=1;\"";
                    break;
                case ".xlsx":
                    ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" +
                                          fileName + ";Extended Properties=\"Excel 12.0 Xml;HDR=No;IMEX=1;\"";
                    break;
                default:
                    return null;
            }
            DbProviderFactory factory = DbProviderFactories.GetFactory("System.Data.OleDb");
            OleDbConnection connection = (OleDbConnection)factory.CreateConnection();
            connection.ConnectionString = ConnectionString;
            if (connection.State == ConnectionState.Open)
            {
                connection.Close();
            }
            connection.Open();

            System.Data.DataTable dtSheets = connection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            List<string> excelSheets = new List<string>();
            int k = 0;
            foreach (DataRow row in dtSheets.Rows)
            {
                if (!row["TABLE_NAME"].ToString().EndsWith("_"))
                    excelSheets.Add(row["TABLE_NAME"].ToString());
                k++;
            }
            // Loop through all of the sheets
            using (connection)
            {
                using (OleDbCommand command = connection.CreateCommand())
                {
                    for (int j = 0; j < excelSheets.Count; j++)
                    {
                        System.Data.DataTable dtSheet = new System.Data.DataTable(excelSheets[j].Replace("$", ""));
                        command.CommandText = "SELECT * FROM [" + excelSheets[j] + "]";
                        if (connection.State != ConnectionState.Open)
                            connection.Open();

                        OleDbDataAdapter oleda = new OleDbDataAdapter();
                        oleda.SelectCommand = command;
                        DataSet ds = new DataSet();
                        oleda.Fill(ds, "Table");
                        #region Commented
                        //int hColCount = hConditions.Count;
                        //int vColCount = vConditions.Count;
                        //if (ds.Tables.Count > 0)
                        //{
                        //    int dataCount = 0;
                        //    if (ds.Tables[0].Rows.Count > 0)
                        //    {
                        //        foreach (DataRow drItem in ds.Tables[0].Rows)
                        //        {
                        //            if (dataCount < (hColCount + 1))
                        //            {
                        //                dataCount++;
                        //                continue;
                        //            }
                        //            //ArrayList data = new ArrayList();
                        //            int colCount = 0;
                        //            foreach (DataColumn dcItem in ds.Tables[0].Columns)
                        //            {
                        //                StringBuilder sb = new StringBuilder();
                        //                if (colCount < vColCount)
                        //                {
                        //                    colCount++;
                        //                    continue;
                        //                }

                        //                int vRowColCount = 0;
                        //                foreach (DataColumn vDataCol in ds.Tables[0].Columns)
                        //                {
                        //                    if (vRowColCount < vColCount)
                        //                    {
                        //                        sb.Append(drItem[vDataCol].ToString());
                        //                        vRowColCount++;
                        //                    }
                        //                    else
                        //                    {
                        //                        break;
                        //                    }
                        //                }


                        //                int hRowColCount = 0;
                        //                foreach (DataRow vData in ds.Tables[0].Rows)
                        //                {
                        //                    if (hRowColCount < hColCount)
                        //                    {
                        //                        sb.Append(vData[dcItem].ToString());
                        //                        hRowColCount++;
                        //                    }
                        //                    else
                        //                    {
                        //                        break;
                        //                    }
                        //                }

                        //                sb.Append(drItem[dcItem].ToString());
                        //                data.Add(sb.ToString());
                        //                colCount++;
                        //            }
                        //            dataList.Add(data);
                        //            dataCount++;
                        //        }
                        //    }
                        //    for (int i = 0; dr.Read(); i++)
                        //    {
                        //        if (i == 0)
                        //        {
                        //            string prevoiouscolumn = string.Empty;
                        //            for (int f = 0; f < dr.FieldCount; f++)
                        //            {
                        //                if (!string.IsNullOrEmpty(dr[f].ToString()))
                        //                {
                        //                    dtSheet.Columns.Add(dr[f].ToString());
                        //                    prevoiouscolumn = dr[f].ToString();
                        //                }
                        //                else
                        //                {
                        //                    dtSheet.Columns.Add("Column" + prevoiouscolumn);
                        //                    defaultOperator = false;
                        //                }
                        //            }
                        //        }
                        //        else if (i != 1 && defaultOperator == false)
                        //        {
                        //            DataRow row = dtSheet.NewRow();
                        //            for (int f = 0; f < dr.FieldCount; f++)
                        //            {
                        //                row[f] = dr[f];

                        //            }
                        //            dtSheet.Rows.Add(row);
                        //        }
                        //        else if (defaultOperator)
                        //        {
                        //            DataRow row = dtSheet.NewRow();
                        //            for (int f = 0; f < dr.FieldCount; f++)
                        //            {
                        //                row[f] = dr[f];

                        //            }
                        //            dtSheet.Rows.Add(row);
                        //        }
                        //    }
                        //} 
                        #endregion
                        return ds;

                    }
                }
            }
            return ds1;
        }
        
    }

    internal class ExcelWriter : IFileWriter
    {
        #region IFileWriter Members

        public string WriteFile(object data)
        {
            throw new NotImplementedException();
        }

        #endregion
    }

    internal interface IFileWriter
    {
        string WriteFile(object data);
    }
}
