-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE FUNCTION TTRACK_SEARCH_STATUS
(
    -- Add the parameters for the function here
    @DOCUMENT_NO VARCHAR(50)
)
RETURNS VARCHAR(50)
AS
BEGIN
    -- Declare the return variable here
    DECLARE @STATUS VARCHAR(50)

    -- Add the T-SQL statements to compute the return value here
    SELECT @STATUS = Status_PSY FROM dbo.workitems_PSY WHERE RefrenceGuid_PSY = @DOCUMENT_NO 

    -- Return the result of the function
    RETURN @STATUS
END