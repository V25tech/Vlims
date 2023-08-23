CREATE FUNCTION [dbo].[USP_WORKFLOW_WHERE_USED]
(@NAME VARCHAR(500))
RETURNS INT
AS
BEGIN
    DECLARE @ReturnValue INT;

    IF ((SELECT COUNT(*) FROM Documentrequest_PSY WHERE Workflow_PSY = @NAME) > 0)
    BEGIN
        SET @ReturnValue = 1;
    END
    ELSE
    BEGIN
        SET @ReturnValue = 0; -- Default return value if none of the conditions are met
    END

    RETURN @ReturnValue;
END;
