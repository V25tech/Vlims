  CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_UPDATE] @EDRId_PSY int, @Documentmanagerid_PSY NVarChar(50),
@documentno_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@printtype_PSY NVarChar(50),
@noofcopies_PSY NVarChar(50),
@workflow_PSY NVarChar(50),
@reason_PSY NVarChar(50),
@browse_PSY NVarChar(50),
@sampletemplate_PSY NVarChar(50),
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[ExistingDocumentRequest_PSY] SET Documentmanagerid_PSY=@Documentmanagerid_PSY,
documentno_PSY=@documentno_PSY,
documenttitle_PSY=@documenttitle_PSY,
printtype_PSY=@printtype_PSY,
noofcopies_PSY=@noofcopies_PSY,
workflow_PSY=@workflow_PSY,
reason_PSY=@reason_PSY,
browse_PSY=@browse_PSY,
sampletemplate_PSY=@sampletemplate_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [EDRId_PSY] = @EDRId_PSY ;  select @EDRId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END