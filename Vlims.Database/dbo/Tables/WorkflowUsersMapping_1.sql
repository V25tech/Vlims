CREATE TABLE [dbo].[WorkflowUsersMapping] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [UserId]       INT            NULL,
    [UserName]     NVARCHAR (200) NULL,
    [WorkFlowId]   INT            NULL,
    [WorkFlowName] NVARCHAR (200) NULL,
    [Type]         NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

