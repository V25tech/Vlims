  CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_INSERT] @Documentmanagerid_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@printtype_PSY NVarChar(50),
@noofcopies_PSY NVarChar(50),
@workflow_PSY NVarChar(50),
@reason_PSY NVarChar(50),
@browse_PSY NVarChar(50),
@sampletemplate_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[ExistingDocumentRequest_PSY] 
 (Documentmanagerid_PSY,
documentno_PSY,
documenttitle_PSY,
printtype_PSY,
noofcopies_PSY,
workflow_PSY,
reason_PSY,
browse_PSY,
sampletemplate_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY)
 VALUES 
(@Documentmanagerid_PSY,
@documentno_PSY,
@documenttitle_PSY,
@printtype_PSY,
@noofcopies_PSY,
@workflow_PSY,
@reason_PSY,
@browse_PSY,
@sampletemplate_PSY,
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