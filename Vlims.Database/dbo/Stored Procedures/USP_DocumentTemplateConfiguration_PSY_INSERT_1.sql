CREATE PROCEDURE [dbo].[USP_DocumentTemplateConfiguration_PSY_INSERT_1] 
    @DocumentMasterId_PSY NVARCHAR(50),
    @Templatename_PSY NVARCHAR(150),
    @Uniquecode_PSY NVARCHAR(150),
    @documenttype_PSY NVARCHAR(150),
    @description_PSY NVARCHAR(200),
    @header_PSY NVARCHAR(50),
    @rows_PSY NVARCHAR(50),
    @columns_PSY NVARCHAR(150),
    @footer_PSY NVARCHAR(150),
    @footer_rows_PSY NVARCHAR(150),
    @footer_columns_PSY NVARCHAR(150),
    @document_PSY XML,
    @CreatedBy_PSY NVARCHAR(100),
    @ModifiedBy_PSY NVARCHAR(100),
    @Status_PSY NVARCHAR(100),
    @Pages INT,
    @IsClone BIT = 0,
    @PreparationId INT = 0
AS 
BEGIN 
    BEGIN TRY 
        DECLARE @ID INT, @Title nvarchar(500)

DECLARE @CombinedString NVARCHAR(MAX)

EXEC USP_GETDOCTITLE_INFO @documenttype_PSY,  @Templatename_PSY, @CombinedString OUTPUT

-- Now @CombinedString holds the combined information
PRINT @CombinedString
        INSERT INTO [dbo].[DocumentTemplateConfiguration_PSY] 
        (
            DocumentMasterId_PSY,
            Templatename_PSY,
            Uniquecode_PSY,
            documenttype_PSY,
            description_PSY,
            header_PSY,
            footer_PSY,
            rows_PSY,
            columns_PSY,
            footer_rows_PSY,
            footer_columns_PSY,
            document_PSY,
            CreatedBy_PSY,
            CreatedDate_PSY,
            ModifiedBy_PSY,
            ModifiedDate_PSY,
            Status_PSY,
            Pages,
            IsClone,
            PreparationId
        )
        VALUES 
        (
            @DocumentMasterId_PSY,
            @Templatename_PSY,
            @Uniquecode_PSY,
            @documenttype_PSY,
            @description_PSY,
            @header_PSY,
            @footer_PSY,
            @rows_PSY,
            @columns_PSY,
            @footer_rows_PSY,
            @footer_columns_PSY,
            @document_PSY,
            @CreatedBy_PSY,
            GETDATE(),
            @ModifiedBy_PSY,
            GETDATE(),
            @Status_PSY,
            @Pages,
            @IsClone,
            @PreparationId
        );

        SELECT @ID = @@IDENTITY; 

        -- Update the XML content
		UPDATE [dbo].[DocumentTemplateConfiguration_PSY]
        SET document_PSY.modify('
            replace value of (/DocumentTemplateConfiguration/titleTable/ArrayOfHeaderTable/HeaderTable/inputValue/text())[1]
            with sql:variable("@CombinedString")
        ')
        WHERE DTID_PSY = @ID;
	SELECT @ID;

        --INSERT into workitems_PSY(TaskName_PSY,TaskType_PSY,Stage_PSY,AssignedToGroup_PSY,InitiatedBy_PSY,InitiatedOn_PSY,Status_PSY,DueDate_PSY,RefrenceId_PSY)
        --SELECT @Templatename_PSY,'Template',@Status_PSY,null,@CreatedBy_PSY,GetDate(),@Status_PSY,GetDate(),@ID

        SELECT @ID 
    END TRY 
    BEGIN CATCH 
        SELECT ERROR_MESSAGE(); 
    END CATCH 
END