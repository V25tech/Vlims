CREATE TABLE [dbo].[AdimManagement_PSY] (
    [AMId_PSY]                INT            IDENTITY (1, 1) NOT NULL,
    [SecurityManagement_PSY]  NVARCHAR (50)  NULL,
    [HierarchyManagement_PSY] NVARCHAR (50)  NULL,
    [PlantManagement_PSY]     NVARCHAR (50)  NULL,
    [UserManagement_PSY]      NVARCHAR (50)  NULL,
    [CreatedBy_PSY]           NVARCHAR (100) NULL,
    [CreatedDate_PSY]         DATETIME       NULL,
    [ModifiedBy_PSY]          NVARCHAR (100) NULL,
    [ModifiedDate_PSY]        DATETIME       NULL,
    CONSTRAINT [PK_AdimManagement_PSY] PRIMARY KEY CLUSTERED ([AMId_PSY] ASC)
);

