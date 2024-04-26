
  CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_GET] @EDRId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT EDRId_PSY,
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
reviewdate_PSY,null as DPNID_PSY
 ,count(*) over() as TotalRows 
 FROM [dbo].[ExistingDocumentRequest_PSY] WITH (NOLOCK) 
 where [EDRId_PSY] = @EDRId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END 


GO


