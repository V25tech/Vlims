
CREATE PROCEDURE [dbo].[USP_AUDIT_LOGS_PSY_INSERT_NEW]
    @UserName NVARCHAR(500),
    @Message NVARCHAR(500) = NULL,
    @Type NVARCHAR(500) = NULL,
    @Action NVARCHAR(500) = NULL,
    @EntityName NVARCHAR(MAX) = NULL,
    @State NVARCHAR(MAX) = NULL,
	@Unique NVARCHAR(50) = NULL, -- Add the @Unique parameter
    @JsonData NVARCHAR(MAX) = NULL
   
AS 
BEGIN 
    BEGIN TRY 
        DECLARE @AuditId_PSY INT 

        INSERT INTO [dbo].[AuditLogs_PSY]
            ([UserName]
            ,[Message]
            ,[Type]
            ,[Action]
            ,[EntityName]
            ,[State]
			,[Unique]
            ,[CreatedDate_PSY]
            ,[JsonData]) -- Add Unique column to the insert statement
        VALUES
            (@UserName,
             @Message,
             @Type,
             @Action,
             @EntityName,
             @State,
			 @Unique,
             GETDATE(), -- Use GETDATE() for current date and time
             @JsonData)

        SELECT @AuditId_PSY = @@IDENTITY; 

        SELECT @AuditId_PSY 
    END TRY 
    BEGIN CATCH 
         SELECT ERROR_MESSAGE(); 
    END CATCH 
END