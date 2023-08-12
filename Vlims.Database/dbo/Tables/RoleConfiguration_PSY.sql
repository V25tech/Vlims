CREATE TABLE [dbo].[RoleConfiguration_PSY] (
    [ROCFId_PSY]                INT            IDENTITY (1, 1) NOT NULL,
    [HierarchyManagementId_PSY] NVARCHAR (50)  NOT NULL,
    [Role_PSY]                  NVARCHAR (150) NULL,
    [Department_PSY]            NVARCHAR (150) NULL,
    [Comments_PSY]              NVARCHAR (150) NULL,
    [CreatedBy_PSY]             NVARCHAR (100) NULL,
    [CreatedDate_PSY]           DATETIME       NULL,
    [ModifiedBy_PSY]            NVARCHAR (100) NULL,
    [ModifiedDate_PSY]          DATETIME       NULL,
    CONSTRAINT [PK_RoleConfiguration_PSY] PRIMARY KEY CLUSTERED ([ROCFId_PSY] ASC)
);



