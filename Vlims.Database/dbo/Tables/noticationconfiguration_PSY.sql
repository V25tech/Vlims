CREATE TABLE [dbo].[noticationconfiguration_PSY] (
    [NCId_PSY]             INT            IDENTITY (1, 1) NOT NULL,
    [DocumentMasterId_PSY] NVARCHAR (50)  NOT NULL,
    [CreatedBy_PSY]        NVARCHAR (100) NULL,
    [CreatedDate_PSY]      DATETIME       NULL,
    [ModifiedBy_PSY]       NVARCHAR (100) NULL,
    [ModifiedDate_PSY]     DATETIME       NULL,
    CONSTRAINT [PK_noticationconfiguration_PSY] PRIMARY KEY CLUSTERED ([NCId_PSY] ASC)
);



