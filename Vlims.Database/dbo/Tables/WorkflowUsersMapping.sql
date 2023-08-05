CREATE TABLE [dbo].[WorkflowUsersMapping]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [UserId] INT NULL, 
    [UserName] NVARCHAR(200) NULL, 
    [WorkFlowId] INT NULL, 
    [WorkFlowName] NVARCHAR(200) NULL, 
    [Type] NVARCHAR(100) NULL, 
    CONSTRAINT [PK_WorkflowReviewMapping] PRIMARY KEY ([Id])
)
