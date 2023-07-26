  CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_GET] @DTID_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DTID_PSY,
DocumentMasterId_PSY,
Templatename_PSY,
Uniquecode_PSY,
documenttype_PSY,
description_PSY,
header_PSY,
rows_PSY,
columns_PSY,
footer_PSY,
rows_PSY,
footer_rows_PSY,
footer_columns_PSY,
columns_PSY,
document_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY ,
Status_PSY
  FROM [dbo].[DocumentTemplateConfiguration_PSY] WITH (NOLOCK) where [DTID_PSY] = @DTID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END