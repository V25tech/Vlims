  CREATE PROCEDURE [dbo].[USP_DocumentPreparation_PSY_DELETE_ALL] @DPNID_PSY nvarchar(max)  
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[DocumentPreparation_PSY] WHERE [DPNID_PSY] IN (select value from STRING_SPLIT(@DPNID_PSY, ',')) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END