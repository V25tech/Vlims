

  CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_UPDATE] @EDRId_PSY int, 
@documentno_PSY NVarChar(50),
@documenttitle_PSY NVarChar(50),
@printtype_PSY NVarChar(50),
@department_PSY NVarChar(50),
@document_PSY NVarChar(50),
@sampletemplate_PSY NVarChar(50),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100),
@effectivedate_PSY datetime,
@reviewdate_PSY datetime
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[ExistingDocumentRequest_PSY] SET 
documentno_PSY=@documentno_PSY,
documenttitle_PSY=@documenttitle_PSY,
documenttype_PSY=@printtype_PSY,
department_PSY=@department_PSY,
document_PSY=@document_PSY,
sampletemplate_PSY=@sampletemplate_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY,
effectivedate_PSY=@effectivedate_PSY,
reviewdate_PSY=@reviewdate_PSY
WHERE  [EDRId_PSY] = @EDRId_PSY ;  select @EDRId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END