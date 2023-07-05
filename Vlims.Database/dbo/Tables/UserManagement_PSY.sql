CREATE TABLE [dbo].[UserManagement_PSY] (
    [UMId_PSY]                   INT            IDENTITY (1, 1) NOT NULL,
    [AdminManagerId_PSY]         NVARCHAR (50)  NOT NULL,
    [UserConfiguration_PSY]      NVARCHAR (50)  NULL,
    [Status_PSY]                 NVARCHAR (50)  NULL,
    [UserGroupConfiguration_PSY] NVARCHAR (50)  NULL,
    [AuditLogs_PSY]              NVARCHAR (50)  NULL,
    [CreatedBy_PSY]              NVARCHAR (100) NULL,
    [CreatedDate_PSY]            DATETIME       NULL,
    [ModifiedBy_PSY]             NVARCHAR (100) NULL,
    [ModifiedDate_PSY]           DATETIME       NULL,
    CONSTRAINT [PK_UserManagement_PSY] PRIMARY KEY CLUSTERED ([UMId_PSY] ASC)
);

