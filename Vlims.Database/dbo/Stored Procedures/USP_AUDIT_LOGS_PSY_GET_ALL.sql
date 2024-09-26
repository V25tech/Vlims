CREATE PROCEDURE [dbo].[USP_AUDIT_LOGS_PSY_GET_ALL]
AS 
BEGIN 
    BEGIN TRY 
        SELECT [AuditId_PSY]
             ,[UserName]
             ,[Message]
             ,[Type]
             ,[Action]
             ,[EntityName]
             ,[State]
             ,[CreatedBy_PSY]
             ,[CreatedDate_PSY]
             ,[JsonData]
        FROM [dbo].[AuditLogs_PSY];
    END TRY 
    BEGIN CATCH
        SELECT ERROR_MESSAGE(); 
    END CATCH 
END