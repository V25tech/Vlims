CREATE PROCEDURE USP_GETDOCTITLE_INFO 
    @documenttype_PSY NVARCHAR(150),
    @Templatename_PSY NVARCHAR(150),
    @CombinedInfo NVARCHAR(MAX) OUTPUT -- Add an output parameter
AS 
BEGIN
    BEGIN TRY
        DECLARE @DEPARTMENT NVARCHAR(500);
        DECLARE @PlantName NVARCHAR(500);
        DECLARE @PlantAddress NVARCHAR(500);
        
        -- Retrieve the department based on document type
        SELECT @DEPARTMENT = [Assigntodepartment_PSY] 
        FROM [dbo].[DocumentTypeConfiguration_PSY] 
        WHERE [Documenttypename_PSY] = @documenttype_PSY;

        -- Retrieve the most recent plant name and address
        SELECT TOP(1) @PlantName = PlantName_PSY, @PlantAddress = PlantAddress_PSY 
        FROM dbo.PlantManagement_PSY 
        ORDER BY ModifiedDate_PSY DESC;

        -- Combine the values into a single string
        --SET @CombinedInfo =  @PlantName + '\n' + @PlantAddress +'\n'+ @DEPARTMENT + '\n' + @Templatename_PSY;
		  SET @CombinedInfo =  @PlantName + CHAR(13) + CHAR(10) + @PlantAddress + CHAR(13) + CHAR(10) + @DEPARTMENT + CHAR(13) + CHAR(10) + @Templatename_PSY;


        -- No need to return the value; it's set through the output parameter
    END TRY
    BEGIN CATCH
        -- Handle any errors
        SET @CombinedInfo = NULL; -- Set to NULL or any appropriate value
    END CATCH
END