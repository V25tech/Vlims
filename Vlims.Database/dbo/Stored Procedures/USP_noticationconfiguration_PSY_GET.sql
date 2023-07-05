  CREATE PROCEDURE [dbo].[USP_noticationconfiguration_PSY_GET] @NCId_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT NCId_PSY,
DocumentMasterId_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[noticationconfiguration_PSY] WITH (NOLOCK) where [NCId_PSY] = @NCId_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END