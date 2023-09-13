CREATE TABLE [dbo].[AUDIT_LOG_PSY] (
    [UserName]    NVARCHAR (150) NULL,
    [Message]     NVARCHAR (500) NULL,
    [Type]        NVARCHAR (150) NULL,
    [Action]      NVARCHAR (50)  NULL,
    [CreatedDate] DATETIME       NULL,
    [State]       NVARCHAR (50)  NULL,
    [Audit_id]    INT            IDENTITY (1, 1) NOT NULL,
    [EntityName]  VARCHAR (250)  NULL
);



