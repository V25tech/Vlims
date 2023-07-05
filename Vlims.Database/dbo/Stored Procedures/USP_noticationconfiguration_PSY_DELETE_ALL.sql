  CREATE PROCEDURE [dbo].[USP_noticationconfiguration_PSY_DELETE_ALL] @NCId_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[noticationconfiguration_PSY] WHERE [NCId_PSY] IN (select value from STRING_SPLIT(@NCId_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END