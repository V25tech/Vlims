


 CREATE PROCEDURE [dbo].[USP_PlantManagement_PSY_GET_ALL]  @PageSize  INT=50, @PageNumber INT=1  
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT PMId_PSY,
AdminManagerId_PSY,
PlantName_PSY,
PlantCode_PSY,
PlantAddress_PSY,
Comments_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY,
Status_PSY
 ,count(*) over() as TotalRows 
 FROM [dbo].[PlantManagement_PSY] WITH (NOLOCK) 
 Order by   CreatedDate_PSY desc
 OFFSET @PageSize * (@PageNumber - 1) ROWS 
  FETCH NEXT @PageSize ROWS ONLY; 
  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END
GO


