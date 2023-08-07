CREATE TABLE [dbo].[ExistingDocumentRequest_PSY] (
    [EDRId_PSY]          INT            IDENTITY (1, 1) NOT NULL,
    [documentno_PSY]     NVARCHAR (50)  NULL,
    [documenttitle_PSY]  NVARCHAR (50)  NULL,
    [documenttype_PSY]   NVARCHAR (50)  NULL,
    [department_PSY]     NVARCHAR (50)  NULL,
    [document_PSY]       NVARCHAR (50)  NULL,
    [sampletemplate_PSY] NVARCHAR (50)  NULL,
    [CreatedBy_PSY]      NVARCHAR (100) NULL,
    [CreatedDate_PSY]    DATETIME       NULL,
    [ModifiedBy_PSY]     NVARCHAR (100) NULL,
    [ModifiedDate_PSY]   DATETIME       NULL,
    [effectivedate_PSY]  DATETIME       NULL,
    [reviewdate_PSY]     DATETIME       NULL,
    CONSTRAINT [PK_ExistingDocumentRequest_PSY] PRIMARY KEY CLUSTERED ([EDRId_PSY] ASC)
);



