  CREATE PROCEDURE [dbo].[USP_noticationconfiguration_PSY_DELETE] @NCId_PSY int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[noticationconfiguration_PSY]  WHERE [NCId_PSY] IN (@NCId_PSY) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END