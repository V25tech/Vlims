CREATE TABLE [dbo].[dashboardconfiguration_PSY] (
    [DCId_PSY]         INT            IDENTITY (1, 1) NOT NULL,
    [DocumentMasterId] NVARCHAR (50)  NOT NULL,
    [CreatedBy_PSY]    NVARCHAR (100) NULL,
    [CreatedDate_PSY]  DATETIME       NULL,
    [ModifiedBy_PSY]   NVARCHAR (100) NULL,
    [ModifiedDate_PSY] DATETIME       NULL,
    CONSTRAINT [PK_dashboardconfiguration_PSY] PRIMARY KEY CLUSTERED ([DCId_PSY] ASC)
);

