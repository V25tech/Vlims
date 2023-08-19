  CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_INSERT] @DocumentMasterId_PSY NVarChar(50),
@Templatename_PSY NVarChar(50),
@Uniquecode_PSY NVarChar(50),
@documenttype_PSY NVarChar(50),
@description_PSY NVarchar(200),
@header_PSY NVarChar(50),
@rows_PSY NVarChar(50),
@columns_PSY NVarChar(50),
@footer_PSY NVarChar(50),
@footer_rows_PSY NVarchar (50),
@footer_columns_PSY NVarchar (50),
@document_PSY XML,
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100),
@Status_PSY NVarChar(100),
@Pages int
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[DocumentTemplateConfiguration_PSY] 
 (DocumentMasterId_PSY,
Templatename_PSY,
Uniquecode_PSY,
documenttype_PSY,
description_PSY,
header_PSY,
footer_PSY,
rows_PSY,
columns_PSY,
footer_rows_PSY,
footer_columns_PSY,
document_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
Status_PSY,Pages)
 VALUES 
(@DocumentMasterId_PSY,
@Templatename_PSY,
@Uniquecode_PSY,
@documenttype_PSY,
@description_PSY,
@header_PSY,
@footer_PSY,
@rows_PSY,
@columns_PSY,
@footer_rows_PSY,
@footer_columns_PSY,
@document_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate(),
 @Status_PSY,@Pages);
 SELECT @ID = @@IDENTITY; 

 --INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY)
 --SELECT @Templatename_PSY,'Template',@Status_PSY,null,@CreatedBy_PSY,GetDate(),@Status_PSY,GetDate(),@ID

 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END