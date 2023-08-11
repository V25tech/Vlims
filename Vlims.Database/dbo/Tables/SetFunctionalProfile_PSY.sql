CREATE TABLE [dbo].[SetFunctionalProfile_PSY] (
    [SFPID_PSY]                          INT            IDENTITY (1, 1) NOT NULL,
    [Role_PSY]                           BIT            NULL,
    [Document_PSY]                       xml null,
    [CreatedBy_PSY]                      NVARCHAR (100) NULL,
    [CreatedDate_PSY]                    DATETIME       NULL,
    [ModifiedBy_PSY]                     NVARCHAR (100) NULL,
    [ModifiedDate_PSY]                   DATETIME       NULL,
    CONSTRAINT [PK_SetFunctionalProfile_PSY] PRIMARY KEY CLUSTERED ([SFPID_PSY] ASC)
);

