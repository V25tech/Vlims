CREATE TABLE [dbo].[AuditLogs_PSY] (
    [AuditId_PSY]     INT            IDENTITY (1, 1) NOT NULL,
    [UserName]        NVARCHAR (500) NOT NULL,
    [Message]         NVARCHAR (500) NULL,
    [Type]            NVARCHAR (500) NULL,
    [Action]          NVARCHAR (500) NULL,
    [EntityName]      NVARCHAR (MAX) NULL,
    [State]           NVARCHAR (MAX) NULL,
    [CreatedBy_PSY]   NVARCHAR (500) NULL,
    [CreatedDate_PSY] DATETIME       NULL,
    [JsonData]        NVARCHAR (MAX) NULL,
    [Unique]          NVARCHAR (500) NULL,
    CONSTRAINT [PK_AuditLogs_PSY] PRIMARY KEY CLUSTERED ([AuditId_PSY] ASC)
);

