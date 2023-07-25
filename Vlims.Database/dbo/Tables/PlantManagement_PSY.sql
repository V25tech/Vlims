CREATE TABLE [dbo].[PlantManagement_PSY] (
    [PMId_PSY]           INT            IDENTITY (1, 1) NOT NULL,
    [AdminManagerId_PSY] NVARCHAR (50)  NOT NULL,
    [PlantName_PSY]      NVARCHAR (50)  NULL,
    [PlantCode_PSY]      NVARCHAR (50)  NULL,
    [PlantAddress_PSY]   NVARCHAR (50)  NULL,
    [Comments_PSY]       NVARCHAR (50)  NULL,
    [CreatedBy_PSY]      NVARCHAR (100) NULL,
    [CreatedDate_PSY]    DATETIME       NULL,
    [ModifiedBy_PSY]     NVARCHAR (100) NULL,
    [ModifiedDate_PSY]   DATETIME       NULL,
    [Status_PSY] NVARCHAR(50) NULL, 
    CONSTRAINT [PK_PlantManagement_PSY] PRIMARY KEY CLUSTERED ([PMId_PSY] ASC)
);

