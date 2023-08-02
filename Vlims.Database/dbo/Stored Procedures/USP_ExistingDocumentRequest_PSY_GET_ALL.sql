 CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT EDRId_PSY,
Documentmanagerid_PSY,
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
ModifiedDate_PSY  
 ,count(*) over() as TotalRows 
 FROM [dbo].[ExistingDocumentRequest_PSY] WITH (NOLOCK) 
 Order by [EDRId_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END