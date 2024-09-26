CREATE PROCEDURE [dbo].[USP_AUDIT_LOG_ENTITY_INFO_GET_BY_WORKITEMNAME]
    @WorkItemName NVARCHAR(250)
AS
BEGIN
    BEGIN TRY
        SELECT *
        FROM [dbo].[Audit_Log_Entity_Info]
        WHERE [WorkItemName] = @WorkItemName;
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE();
    END CATCH;
END;