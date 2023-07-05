  CREATE PROCEDURE [dbo].[USP_PlantManagement_PSY_By_AdminManagerId_GET] @AdminManagerId int 
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
ModifiedDate_PSY 
  FROM [dbo].[PlantManagement_PSY] WITH (NOLOCK) where AdminManagerId_PSY = @AdminManagerId   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END