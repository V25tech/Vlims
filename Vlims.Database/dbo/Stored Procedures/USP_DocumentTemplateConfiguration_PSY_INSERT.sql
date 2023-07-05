  CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_INSERT] @DocumentMasterId_PSY NVarChar(50),
@Templatename_PSY NVarChar(50),
@Uniquecode_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@header_PSY NVarChar(50),
@rows_PSY NVarChar(50),
@columns_PSY NVarChar(50),
@footer_PSY NVarChar(50),
@footer_rows_PSY NVarchar (50),
@footer_columns_PSY NVarchar (50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[DocumentTemplateConfiguration_PSY] 
 (DocumentMasterId_PSY,
Templatename_PSY,
Uniquecode_PSY,
documenttype_PSY,
header_PSY,

footer_PSY,
rows_PSY,
columns_PSY,
footer_rows_PSY,
footer_columns_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@DocumentMasterId_PSY,
@Templatename_PSY,
@Uniquecode_PSY,
@documenttype_PSY,
@header_PSY,

@footer_PSY,
@rows_PSY,
@columns_PSY,
@footer_rows_PSY,
@footer_columns_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate() );
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END