 CREATE PROCEDURE [dbo].[USP_DocumentManager_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT DMGId_PSY,
Documentrequest,
documentpreparation,
DocumentEffective_PSY,
AdditionalTasks_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY  
 ,count(*) over() as TotalRows 
 FROM [dbo].[DocumentManager_PSY] WITH (NOLOCK) 
 Order by [DMGId_PSY]  
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END