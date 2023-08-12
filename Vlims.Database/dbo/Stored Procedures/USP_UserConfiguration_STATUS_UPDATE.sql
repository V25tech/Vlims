  CREATE PROCEDURE [dbo].[USP_UserConfiguration_STATUS_UPDATE] @UCFId_PSY int, 
@Status_PSY NVarchar(100)
 AS 
 BEGIN 
  BEGIN TRY 
  
 UPDATE [dbo].[UserConfiguration_PSY] SET Status_PSY=@Status_PSY WHERE  [UCFId_PSY] = @UCFId_PSY ;  select @UCFId_PSY; 
  
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END