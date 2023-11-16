


 CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
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
reviewdate_PSY 
 ,count(*) over() as TotalRows 
 FROM [dbo].[ExistingDocumentRequest_PSY] WITH (NOLOCK) 
 Order by [EDRId_PSY] DESC
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END