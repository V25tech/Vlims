CREATE TABLE [dbo].[DocumentManager_PSY] (
    [DMGId_PSY]             INT            IDENTITY (1, 1) NOT NULL,
    [Documentrequest]       NVARCHAR (50)  NULL,
    [documentpreparation]   NVARCHAR (50)  NULL,
    [DocumentEffective_PSY] NVARCHAR (50)  NULL,
    [AdditionalTasks_PSY]   NVARCHAR (50)  NULL,
    [CreatedBy_PSY]         NVARCHAR (100) NULL,
    [CreatedDate_PSY]       DATETIME       NULL,
    [ModifiedBy_PSY]        NVARCHAR (100) NULL,
    [ModifiedDate_PSY]      DATETIME       NULL,
    CONSTRAINT [PK_DocumentManager_PSY] PRIMARY KEY CLUSTERED ([DMGId_PSY] ASC)
);

