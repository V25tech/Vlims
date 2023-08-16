  CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_UPDATE] @DTID_PSY int, @DocumentMasterId_PSY NVarChar(50),
@Templatename_PSY NVarChar(50),
@Uniquecode_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@description_PSY NVarchar(200),
@header_PSY NVarChar(50),
@rows_PSY NVarChar(50),
@columns_PSY NVarChar(50),
@footer_PSY NVarChar(50),
@footer_rows_PSY NVarChar(50),
@footer_columns_PSY NVarChar(50),
@document_PSY xml,
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100),
@Pages int
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[DocumentTemplateConfiguration_PSY] SET DocumentMasterId_PSY=@DocumentMasterId_PSY,
Templatename_PSY=@Templatename_PSY,
Uniquecode_PSY=@Uniquecode_PSY,
documenttype_PSY=@documenttype_PSY,
description_PSY=@description_PSY,
header_PSY=@header_PSY,
rows_PSY=@rows_PSY,
columns_PSY=@columns_PSY,
footer_PSY=@footer_PSY,
footer_rows_PSY=@footer_rows_PSY,
footer_columns_PSY=@footer_columns_PSY,
document_PSY=@document_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY, 
Status_PSY=@Status_PSY,Pages=@Pages WHERE  [DTID_PSY] = @DTID_PSY ;  select @DTID_PSY;

--IF(@Status_PSY='APPROVED' OR @Status_PSY='APPROVE')
--BEGIN

--UPDATE workitems_PSY SET Status_PSY='APPROVED' WHERE RefrenceId_PSY=@DTID_PSY  and TaskType_PSY='Template'

--END
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END