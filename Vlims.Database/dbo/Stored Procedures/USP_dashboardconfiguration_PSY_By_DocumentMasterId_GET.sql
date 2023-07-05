  CREATE PROCEDURE [dbo].[USP_dashboardconfiguration_PSY_By_DocumentMasterId_GET] @DocumentMasterId int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT DCId_PSY,
DocumentMasterId,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[dashboardconfiguration_PSY] WITH (NOLOCK) where DocumentMasterId = @DocumentMasterId   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END