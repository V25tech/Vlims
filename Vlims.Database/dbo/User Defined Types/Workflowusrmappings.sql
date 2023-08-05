CREATE TYPE [dbo].[Workflowusrmappings] AS TABLE
(
	UserId INT NULL, 
    UserName NVARCHAR(200) NULL, 
    WorkFlowId INT NULL, 
    WorkFlowName NVARCHAR(200) NULL, 
    Type NVARCHAR(100) NULL);
