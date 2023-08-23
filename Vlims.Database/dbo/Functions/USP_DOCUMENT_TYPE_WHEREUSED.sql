CREATE FUNCTION dbo.USP_DOCUMENT_TYPE_WHEREUSED
(@NAME VARCHAR(500))
RETURNS INT
AS
BEGIN
    DECLARE @ReturnValue INT;

    IF ((SELECT COUNT(*) FROM DocumentTemplateConfiguration_PSY WHERE documenttype_PSY = @NAME) > 0)
    BEGIN
        SET @ReturnValue = 1;
    END
    ELSE IF ((SELECT COUNT(*) FROM workflowconiguration_PSY WHERE documenttype_PSY = @NAME) > 0)
    BEGIN
        SET @ReturnValue = 1;
    END
    ELSE IF ((SELECT COUNT(*) FROM Documentrequest_PSY WHERE documenttype_PSY = @NAME) > 0)
    BEGIN
        SET @ReturnValue = 1;
    END
    ELSE IF ((SELECT COUNT(*) FROM DocumentPreparation_PSY WHERE documenttype_PSY = @NAME) > 0)
    BEGIN
        SET @ReturnValue = 1;
    END
    ELSE
    BEGIN
        SET @ReturnValue = 0; -- Default return value if none of the conditions are met
    END

    RETURN @ReturnValue;
END;
