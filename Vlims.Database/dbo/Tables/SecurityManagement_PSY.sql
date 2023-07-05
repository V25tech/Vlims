CREATE TABLE [dbo].[SecurityManagement_PSY] (
    [SMId_PSY]                  INT            IDENTITY (1, 1) NOT NULL,
    [AdminManagerId_PSY]        NVARCHAR (50)  NOT NULL,
    [MinimumUserIdLength_PSY]   NVARCHAR (50)  NULL,
    [MinimumPasswordLength_PSY] NVARCHAR (50)  NULL,
    [PasswordComplexity_PSY]    INT            NULL,
    [InvalidAttempts_PSY]       INT            NULL,
    [SessionTimeOut_PSY]        INT            NULL,
    [CreatedBy_PSY]             NVARCHAR (100) NULL,
    [CreatedDate_PSY]           DATETIME       NULL,
    [ModifiedBy_PSY]            NVARCHAR (100) NULL,
    [ModifiedDate_PSY]          DATETIME       NULL,
    CONSTRAINT [PK_SecurityManagement_PSY] PRIMARY KEY CLUSTERED ([SMId_PSY] ASC)
);

