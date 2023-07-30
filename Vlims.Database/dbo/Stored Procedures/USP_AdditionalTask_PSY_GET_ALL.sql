 CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT ATID_PSY,
Documentmanagerid_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
Status_PSY,
Version,
 ,count(*) over() as TotalRows  ,
 de.document_PSY,de.department_PSY,de.documentno_PSY,de.documenttitle_PSY,de.documenttype_PSY,de.EffectiveDate_PSY,de.Reviewdate_PSY

 FROM [dbo].[AdditionalTask_PSY] AT WITH (NOLOCK) inner join DocumentEffective_PSY de on AT.Documentmanagerid_PSY=de.DEID_PSY
 
 Order by [ATID_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END