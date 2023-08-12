CREATE TABLE [dbo].[Approval_Configuration_PSY] (
    [DocTypeNoOfApprovals] INT NULL,
    [DocTempNoOfApprovals] INT NULL,
    [WFlowNoOfApprovals]   INT NULL,
    [ApprConfigId]         INT IDENTITY (1, 1) NOT NULL,
    CONSTRAINT [PK_Approval_Configuration_PSY] PRIMARY KEY CLUSTERED ([ApprConfigId] ASC)
);

