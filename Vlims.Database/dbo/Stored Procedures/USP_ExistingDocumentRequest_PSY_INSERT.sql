



  CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_INSERT] 
@documentno_PSY NVarChar(150),
@documenttitle_PSY NVarChar(150),
@printtype_PSY NVarChar(150),
@department_PSY NVarChar(150),
@browse_PSY NVarChar(150),
@sampletemplate_PSY NVarChar(150),
@CreatedBy_PSY NVarChar(100),
@ModifiedBy_PSY NVarChar(100),
@effectivedate_PSY datetime,
@reviewdate_PSY NVarChar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
 DECLARE @ID INT 
 INSERT INTO [dbo].[ExistingDocumentRequest_PSY] 
 (
documentno_PSY,
documenttitle_PSY,
documenttype_PSY,
department_PSY,
document_PSY,
sampletemplate_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
effectivedate_PSY,
reviewdate_PSY
)
 VALUES 
(
@documentno_PSY,
@documenttitle_PSY,
@printtype_PSY,
@department_PSY,
@browse_PSY,
@sampletemplate_PSY,
@CreatedBy_PSY,
 GetDate() ,
@ModifiedBy_PSY,
 GetDate(),
 @effectivedate_PSY,
@reviewdate_PSY);
 SELECT @ID = @@IDENTITY; 
 select @ID 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END