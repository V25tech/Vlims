  CREATE PROCEDURE [dbo].[USP_SetFunctionalProfile_PSY_GET] @SFPID_PSY int 
 AS 
 BEGIN 
 BEGIN TRY 
  SELECT SFPID_PSY,
Role_PSY,
CreatedBy_PSY,
CreatedDate_PSY,
ModifiedBy_PSY,
Document_PSY,
ModifiedDate_PSY 
  FROM [dbo].[SetFunctionalProfile_PSY] WITH (NOLOCK) where [SFPID_PSY] = @SFPID_PSY   
 END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END