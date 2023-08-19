

 CREATE PROCEDURE [dbo].[USP_AUDIT_LOG_GET_ALL]    
 AS 
 BEGIN 
 BEGIN TRY 
 SELECT [UserName]
      ,[EntityName]
      ,[Message]
      ,[Type]
      ,[Action]
      ,[CreatedDate]
      ,[State]
      ,[AuditId]
  FROM [dbo].[AUDIT_LOG_PSY]

  END TRY 
 BEGIN CATCH 
  SELECT ERROR_MESSAGE(); 
 END CATCH 
 END