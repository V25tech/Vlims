  CREATE PROCEDURE [dbo].[USP_AdditionalTask_PSY_By_Documentmanagerid_DELETE] @Documentmanagerid int 
 AS 
 BEGIN 
  BEGIN TRY 
 DELETE FROM [dbo].[AdditionalTask_PSY]  WHERE DocumentEffective_ID IN (@Documentmanagerid) 
  END TRY 
 BEGIN CATCH 
 SELECT ERROR_MESSAGE(); 
 END CATCH 
 END