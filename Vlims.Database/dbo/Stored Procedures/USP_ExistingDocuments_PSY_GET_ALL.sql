CREATE PROCEDURE [dbo].[USP_ExistingDocuments_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1, @UserName varchar(50) = null
 AS 
 BEGIN 
 BEGIN TRY 
 
  SELECT DRId_PSY as ID_PSY,
	Documentmanagerid_PSY,
	documenttitle_PSY,
	documentno_PSY,
	documenttype_PSY,
	department_PSY,
	document_PSY,
	EffectiveDate_PSY,
	Reviewdate_PSY,
	CreatedBy_PSY,
	CreatedDate_PSY,
	ModifiedBy_PSY,
	ModifiedDate_PSY,
	Status_PSY,
	Refrence_PSY
    ,count(*) over() as TotalRows
  FROM [dbo].[DocumentRevision_PSY] WITH (NOLOCK) where Status_PSY ='Approved'
	 Order by ModifiedDate_PSY DESC  
	 OFFSET @PageSize * (@PageNumber - 1) ROWS 
	  FETCH NEXT @PageSize ROWS ONLY; 


 SELECT EDRId_PSY as ID_PSY,
documentno_PSY,
documenttitle_PSY,
documenttype_PSY,
department_PSY,
document_PSY,
sampletemplate_PSY as Template_PSY,
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

 select * from dbo.workitems_PSY

 select * from dbo.DocumentPreparation_PSY