  CREATE PROCEDURE [dbo].[USP_SetFunctionalProfile_PSY_UPDATE] @SFPID_PSY int, @Role_PSY NVarChar(500) ,
@Document_PSY xml,
@ModifiedBy_PSY NVarChar(100) 
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[SetFunctionalProfile_PSY] SET 
Document_PSY=@Document_PSY,
ModifiedBy_PSY=@ModifiedBy_PSY WHERE  [SFPID_PSY] = @SFPID_PSY ;  select @SFPID_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END