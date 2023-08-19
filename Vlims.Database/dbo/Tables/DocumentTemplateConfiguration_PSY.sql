CREATE TABLE [dbo].[DocumentTemplateConfiguration_PSY] (
    [DTID_PSY]             INT            IDENTITY (1, 1) NOT NULL,
    [DocumentMasterId_PSY] NVARCHAR (50)  NOT NULL,
    [Templatename_PSY]     NVARCHAR (150) NULL,
    [Uniquecode_PSY]       NVARCHAR (150) NULL,
    [documenttype_PSY]     NVARCHAR (50)  NULL,
    [description_PSY]      NVARCHAR (200) NULL,
    [header_PSY]           NVARCHAR (50)  NULL,
    [rows_PSY]             NVARCHAR (50)  NULL,
    [columns_PSY]          NVARCHAR (50)  NULL,
    [footer_PSY]           NVARCHAR (50)  NULL,
    [footer_rows_PSY]      NVARCHAR (50)  NULL,
    [footer_columns_PSY]   NVARCHAR (50)  NULL,
    [document_PSY]         XML            NULL,
    [CreatedBy_PSY]        NVARCHAR (100) NULL,
    [CreatedDate_PSY]      DATETIME       NULL,
    [ModifiedBy_PSY]       NVARCHAR (100) NULL,
    [ModifiedDate_PSY]     DATETIME       NULL,
    [Status_PSY]           NVARCHAR (50)  NULL,
    [Pages] INT NULL, 
    CONSTRAINT [PK_DocumentTemplateConfiguration_PSY] PRIMARY KEY CLUSTERED ([DTID_PSY] ASC)
);



