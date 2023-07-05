CREATE TABLE [dbo].[DocumentRevision_PSY] (
    [DRId_PSY]              INT            IDENTITY (1, 1) NOT NULL,
    [Documentmanagerid_PSY] NVARCHAR (50)  NOT NULL,
    [documenttitle_PSY]     NVARCHAR (50)  NULL,
    [documentno_PSY]        NVARCHAR (50)  NULL,
    [documenttype_PSY]      NVARCHAR (50)  NULL,
    [department_PSY]        NVARCHAR (50)  NULL,
    [document_PSY]          NVARCHAR (50)  NULL,
    [EffectiveDate_PSY]     DATETIME       NULL,
    [Reviewdate_PSY]        DATETIME       NULL,
    [CreatedBy_PSY]         NVARCHAR (100) NULL,
    [CreatedDate_PSY]       DATETIME       NULL,
    [ModifiedBy_PSY]        NVARCHAR (100) NULL,
    [ModifiedDate_PSY]      DATETIME       NULL,
    CONSTRAINT [PK_DocumentRevision_PSY] PRIMARY KEY CLUSTERED ([DRId_PSY] ASC)
);

