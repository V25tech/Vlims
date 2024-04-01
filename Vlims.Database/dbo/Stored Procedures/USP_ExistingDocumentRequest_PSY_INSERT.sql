CREATE PROCEDURE [dbo].[USP_ExistingDocumentRequest_PSY_INSERT] 
    @documentno_PSY NVARCHAR(150),
    @documenttitle_PSY NVARCHAR(150),
    @printtype_PSY NVARCHAR(150),
    @department_PSY NVARCHAR(150),
    @browse_PSY NVARCHAR(150),
    @sampletemplate_PSY NVARCHAR(150),
    @CreatedBy_PSY NVARCHAR(100),
    @ModifiedBy_PSY NVARCHAR(100),
    @effectivedate_PSY DATETIME,
    @reviewdate_PSY NVARCHAR(100) = NULL
AS 
BEGIN 
    BEGIN TRY 
        DECLARE @ID INT; 
        INSERT INTO [dbo].[ExistingDocumentRequest_PSY] 
        (
            documentno_PSY,
            documenttitle_PSY,
            documenttype_PSY,
            department_PSY,
            document_PSY,
            sampletemplate_PSY,
            CreatedBy_PSY,
            CreatedDate_PSY,
            ModifiedBy_PSY,
            ModifiedDate_PSY,
            effectivedate_PSY,
            reviewdate_PSY
        )
        VALUES 
        (
            @documentno_PSY,
            @documenttitle_PSY,
            @printtype_PSY,
            @department_PSY,
            @browse_PSY,
            @sampletemplate_PSY,
            @CreatedBy_PSY,
            GETDATE(),
            @ModifiedBy_PSY,
            GETDATE(),
            @effectivedate_PSY,
            CASE WHEN @reviewdate_PSY IS NULL THEN GETDATE() ELSE @reviewdate_PSY END
        );
        
        SELECT @ID = @@IDENTITY; 
        SELECT @ID;
    END TRY 
    BEGIN CATCH 
        SELECT ERROR_MESSAGE(); 
    END CATCH; 
END;
