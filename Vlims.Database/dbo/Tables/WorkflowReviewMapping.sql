CREATE TABLE [dbo].[WorkflowReviewMapping]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Type_PSY] NVARCHAR(200) NULL, 
    [TypeId_PSY] INT NULL, 
    [User_PSY] NVARCHAR(200) NULL, 
    [CreatedBy_PSY] NVARCHAR(200) NULL, 
    [CreatedDate_PSY] DATETIME NULL, 
    [UpdatedBy_PSY] NVARCHAR(200) NULL, 
    [UpdatedDate_PSY] DATETIME NULL, 
    [Status_PSY] BIT NULL
)
