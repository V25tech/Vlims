CREATE TABLE [dbo].[ExistingDocumentRequest_PSY] (
    [EDRId_PSY]             INT            IDENTITY (1, 1) NOT NULL,
    [Documentmanagerid_PSY] NVARCHAR (50)  NOT NULL,
    [documentno_PSY]        NVARCHAR (50)  NULL,
    [documenttitle_PSY]     NVARCHAR (50)  NULL,
    [printtype_PSY]         NVARCHAR (50)  NULL,
    [noofcopies_PSY]        NVARCHAR (50)  NULL,
    [workflow_PSY]          NVARCHAR (50)  NULL,
    [reason_PSY]            NVARCHAR (50)  NULL,
    [browse_PSY]            NVARCHAR (50)  NULL,
    [sampletemplate_PSY]    NVARCHAR (50)  NULL,
    [CreatedBy_PSY]         NVARCHAR (100) NULL,
    [CreatedDate_PSY]       DATETIME       NULL,
    [ModifiedBy_PSY]        NVARCHAR (100) NULL,
    [ModifiedDate_PSY]      DATETIME       NULL,
    CONSTRAINT [PK_ExistingDocumentRequest_PSY] PRIMARY KEY CLUSTERED ([EDRId_PSY] ASC)
);

