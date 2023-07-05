  CREATE PROCEDURE [dbo].[USP_DocumentMaster_PSY_DELETE_ALL] @Dmid_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentMaster_PSY] WHERE [Dmid_PSY] IN (select value from STRING_SPLIT(@Dmid_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END