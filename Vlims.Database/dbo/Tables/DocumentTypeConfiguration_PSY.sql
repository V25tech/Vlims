CREATE TABLE [dbo].[DocumentTypeConfiguration_PSY] (
    [DTCId_PSY]              INT            IDENTITY (1, 1) NOT NULL,
    [DocumentMasterId_PSY]   NVARCHAR (50)  NOT NULL,
    [Documenttypename_PSY]   NVARCHAR (50)  NULL,
    [documenttypeprefix_PSY] NVARCHAR (50)  NULL,
    [Description_PSY]        NVARCHAR (50)  NULL,
    [Assigntodepartment_PSY] NVARCHAR (50)  NULL,
    [CreatedBy_PSY]          NVARCHAR (100) NULL,
    [CreatedDate_PSY]        DATETIME       NULL,
    [ModifiedBy_PSY]         NVARCHAR (100) NULL,
    [ModifiedDate_PSY]       DATETIME       NULL,
    CONSTRAINT [PK_DocumentTypeConfiguration_PSY] PRIMARY KEY CLUSTERED ([DTCId_PSY] ASC)
);

