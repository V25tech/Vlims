  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_GET] @ATID_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT ATID_PSY,
DocumentEffective_ID,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
ModifiedDate_PSY 
  FROM [dbo].[AdditionalTask_PSY] WITH (NOLOCK) where [ATID_PSY] = @ATID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END