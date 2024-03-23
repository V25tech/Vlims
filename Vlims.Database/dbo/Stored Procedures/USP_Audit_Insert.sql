CREATE PROCEDURE [dbo].[USP_Audit_Insert]
    @UserName NVARCHAR(150),
    @Message NVARCHAR(500),
    @Type NVARCHAR(150),
    @Action NVARCHAR(50),
    @CreatedDate DATETIME,
    @State NVARCHAR(50),
    @EntityName VARCHAR(250),
    @EntityAuditInfo VARCHAR(250)
AS 
BEGIN 
    BEGIN TRY 
        DECLARE @AuditID INT;

        -- Inserting into AUDIT_LOG_PSY1 table
        INSERT INTO [dbo].[AUDIT_LOG_PSY1] 
        (
            [UserName],
            [Message],
            [Type],
            [Action],
            [CreatedDate],
            [State],
            [EntityName],
            [XMLData]
        )
        VALUES 
        (
            @UserName,
            @Message,
            @Type,
            @Action,
            @CreatedDate,
            @State,
            @EntityName,
            @EntityAuditInfo
        );

        -- Capturing the ID of the inserted row
        SELECT @AuditID = SCOPE_IDENTITY();

        -- Returning the ID of the inserted row
        SELECT @AuditID AS [AuditID];
    END TRY 
    BEGIN CATCH 
        SELECT ERROR_MESSAGE() AS ErrorMessage; 
    END CATCH 
END