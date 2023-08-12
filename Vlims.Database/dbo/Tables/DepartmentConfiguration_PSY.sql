CREATE TABLE [dbo].[DepartmentConfiguration_PSY] (
    [DPCFId_PSY]                INT            IDENTITY (1, 1) NOT NULL,
    [HierarchyManagementId_PSY] NVARCHAR (50)  NOT NULL,
    [DepartmentName_PSY]        NVARCHAR (150) NOT NULL,
    [DepartmentCode_PSY]        NVARCHAR (100) NOT NULL,
    [Comments_PSY]              NVARCHAR (500) NOT NULL,
    [CreatedBy_PSY]             NVARCHAR (100) NULL,
    [CreatedDate_PSY]           DATETIME       NULL,
    [ModifiedBy_PSY]            NVARCHAR (100) NULL,
    [ModifiedDate_PSY]          DATETIME       NULL,
    CONSTRAINT [PK_DepartmentConfiguration_PSY] PRIMARY KEY CLUSTERED ([DPCFId_PSY] ASC)
);



