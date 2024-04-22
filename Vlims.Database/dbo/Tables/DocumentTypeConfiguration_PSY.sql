CREATE TABLE [dbo].[DocumentTypeConfiguration_PSY] (
    [DTCId_PSY]              INT            IDENTITY (1, 1) NOT NULL,
    [DocumentMasterId_PSY]   NVARCHAR (50)  NOT NULL,
    [Documenttypename_PSY]   NVARCHAR (200)  NULL,
    [documenttypeprefix_PSY] NVARCHAR (50)  NULL,
    [Description_PSY]        NVARCHAR (500) NULL,
    [Assigntodepartment_PSY] NVARCHAR (MAX) NULL,
    [CreatedBy_PSY]          NVARCHAR (200) NULL,
    [CreatedDate_PSY]        DATETIME       NULL,
    [ModifiedBy_PSY]         NVARCHAR (200) NULL,
    [ModifiedDate_PSY]       DATETIME       NULL,
    [Status_PSY]             NVARCHAR (50)  NULL,
    CONSTRAINT [PK_DocumentTypeConfiguration_PSY] PRIMARY KEY CLUSTERED ([DTCId_PSY] ASC)
);





