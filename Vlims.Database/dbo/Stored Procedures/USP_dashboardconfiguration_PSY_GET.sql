  CREATE PROCEDURE [dbo].[USP_dashboardconfiguration_PSY_GET] @DCId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DCId_PSY,
DocumentMasterId,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[dashboardconfiguration_PSY] WITH (NOLOCK) where [DCId_PSY] = @DCId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END