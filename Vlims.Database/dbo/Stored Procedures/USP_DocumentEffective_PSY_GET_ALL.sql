
 ALTER PROCEDURE [dbo].[USP_DocumentEffective_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT DEID_PSY,
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
STATUS_PSY
 ,count(*) over() as TotalRows 
 FROM [dbo].[DocumentEffective_PSY] WITH (NOLOCK) 
 Order by [DEID_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END