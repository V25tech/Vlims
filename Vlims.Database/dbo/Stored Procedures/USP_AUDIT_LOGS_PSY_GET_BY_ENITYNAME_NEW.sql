
CREATE PROCEDURE [dbo].[USP_AUDIT_LOGS_PSY_GET_BY_ENITYNAME_NEW]
    @Unique NVARCHAR(50) = NULL
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
        FROM [dbo].[AuditLogs_PSY]
        WHERE @Unique IS NULL OR [Unique] = @Unique;
    END TRY 
    BEGIN CATCH
        SELECT ERROR_MESSAGE(); 
    END CATCH 
END