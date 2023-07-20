CREATE TABLE [dbo].[workitems_PSY] (
    [WITId_PSY]           INT            IDENTITY (1, 1) NOT NULL,
    [TaskType_PSY]        NVARCHAR (50)  NULL,
    [Stage_PSY]           NVARCHAR (50)  NULL,
    [AssignedToGroup_PSY] NVARCHAR (50)  NULL,
    [InitiatedOn_PSY]     NVARCHAR (50)  NULL,
    [Status_PSY]          NVARCHAR (50)  NULL,
    [DueDate_PSY]         NVARCHAR (50)  NULL,
    [CreatedBy_PSY]       NVARCHAR (100) NULL,
    [CreatedDate_PSY]     DATETIME       NULL,
    [ModifiedBy_PSY]      NVARCHAR (100) NULL,
    [ModifiedDate_PSY]    DATETIME       NULL,
    CONSTRAINT [PK_workitems_PSY] PRIMARY KEY CLUSTERED ([WITId_PSY] ASC)
);

