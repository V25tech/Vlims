  CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_By_DocumentMasterId_GET] @DocumentMasterId int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DTID_PSY,
DocumentMasterId_PSY,
Templatename_PSY,
Uniquecode_PSY,
documenttype_PSY,
header_PSY,
rows_PSY,
columns_PSY,
footer_PSY,
rows_PSY,
columns_PSY,
footer_rows_PSY,
footer_columns_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
Status_PSY,
ModifiedDate_PSY 
  FROM [dbo].[DocumentTemplateConfiguration_PSY] WITH (NOLOCK) where DocumentMasterId_PSY = @DocumentMasterId   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END