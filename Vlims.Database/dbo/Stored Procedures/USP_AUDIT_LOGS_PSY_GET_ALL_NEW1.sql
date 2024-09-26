
CREATE PROCEDURE [dbo].[USP_AUDIT_LOGS_PSY_GET_ALL_NEW1]
    @Type NVARCHAR(50) = NULL
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
        WHERE @Type IS NULL OR [Type] = @Type;
    END TRY 
    BEGIN CATCH
        SELECT ERROR_MESSAGE(); 
    END CATCH 
END