  CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_UPDATE] @DTID_PSY int, @DocumentMasterId_PSY NVarChar(50),
@Templatename_PSY NVarChar(50),
@Uniquecode_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@header_PSY NVarChar(50),
@rows_PSY NVarChar(50),
@columns_PSY NVarChar(50),
@footer_PSY NVarChar(50),
@footer_rows_PSY NVarChar(50),
@footer_columns_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DocumentTemplateConfiguration_PSY] SET DocumentMasterId_PSY=@DocumentMasterId_PSY,
Templatename_PSY=@Templatename_PSY,
Uniquecode_PSY=@Uniquecode_PSY,
documenttype_PSY=@documenttype_PSY,
header_PSY=@header_PSY,
rows_PSY=@rows_PSY,
columns_PSY=@columns_PSY,
footer_PSY=@footer_PSY,
footer_rows_PSY=@footer_rows_PSY,
footer_columns_PSY=@footer_columns_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY, 
Status_PSY=@Status_PSY WHERE  [DTID_PSY] = @DTID_PSY ;  select @DTID_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END