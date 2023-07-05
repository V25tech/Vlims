  CREATE PROCEDURE [dbo].[USP_noticationconfiguration_PSY_By_DocumentMasterId_GET] @DocumentMasterId int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT NCId_PSY,
DocumentMasterId_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[noticationconfiguration_PSY] WITH (NOLOCK) where DocumentMasterId_PSY = @DocumentMasterId   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END