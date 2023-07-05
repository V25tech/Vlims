CREATE TABLE [dbo].[HierarchyManagement_PSY] (
    [HMId_PSY]                    INT            IDENTITY (1, 1) NOT NULL,
    [AdminManagerId_PSY]          NVARCHAR (50)  NOT NULL,
    [DepartmentConfiguration_PSY] NVARCHAR (50)  NULL,
    [RoleConfiguration_PSY]       NVARCHAR (50)  NULL,
    [SetFunctionalProfile_PSY]    NVARCHAR (50)  NULL,
    [CreatedBy_PSY]               NVARCHAR (100) NULL,
    [CreatedDate_PSY]             DATETIME       NULL,
    [ModifiedBy_PSY]              NVARCHAR (100) NULL,
    [ModifiedDate_PSY]            DATETIME       NULL,
    CONSTRAINT [PK_HierarchyManagement_PSY] PRIMARY KEY CLUSTERED ([HMId_PSY] ASC)
);

