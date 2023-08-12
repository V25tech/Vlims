CREATE TABLE [dbo].[DocumentPrint_PSY] (
    [DRId_PSY]          INT            IDENTITY (1, 1) NOT NULL,
    [documenttitle_PSY] NVARCHAR (150) NULL,
    [printtype_PSY]     NVARCHAR (150) NULL,
    [documentno_PSY]    NVARCHAR (150) NULL,
    [noofcopies_PSY]    NVARCHAR (150) NULL,
    [workflow_PSY]      NVARCHAR (150) NULL,
    [reason_PSY]        NVARCHAR (250) NULL,
    [CreatedBy_PSY]     NVARCHAR (100) NULL,
    [CreatedDate_PSY]   DATETIME       NULL,
    [ModifiedBy_PSY]    NVARCHAR (100) NULL,
    [ModifiedDate_PSY]  DATETIME       NULL,
    [Status_PSY]        NVARCHAR (150) NULL,
    [Refrence_PSY]      INT            NULL,
    CONSTRAINT [PK_DocumentPrint_PSY] PRIMARY KEY CLUSTERED ([DRId_PSY] ASC)
);





