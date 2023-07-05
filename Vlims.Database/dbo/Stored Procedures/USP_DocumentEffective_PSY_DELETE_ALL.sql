  CREATE PROCEDURE [dbo].[USP_DocumentEffective_PSY_DELETE_ALL] @DEID_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentEffective_PSY] WHERE [DEID_PSY] IN (select value from STRING_SPLIT(@DEID_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END