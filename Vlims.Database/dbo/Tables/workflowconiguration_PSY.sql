CREATE TABLE [dbo].[workflowconiguration_PSY] (
    [WFCId_PSY]            INT            IDENTITY (1, 1) NOT NULL,
    [DocumentMasterId_PSY] NVARCHAR (50)  NOT NULL,
    [workflowName_PSY]     NVARCHAR (50)  NULL,
    [code_PSY]                 NVARCHAR (50)  NULL,   
    [documentstage_PSY]    NVARCHAR (50)  NULL,
    [documenttype_PSY]     NVARCHAR (50)  NULL,
    [department_PSY]       NVARCHAR (50)  NULL,
    [reviewsCount_PSY]     INT            NULL,
    [approvalsCount_PSY]   INT            NULL,
    [CreatedBy_PSY]        NVARCHAR (100) NULL,
    [CreatedDate_PSY]      DATETIME       NULL,
    [ModifiedBy_PSY]       NVARCHAR (100) NULL,
    [ModifiedDate_PSY]     DATETIME       NULL,
    [Status_PSY] NVARCHAR(50) NULL, 
    [Document_PSY] XML NULL, 
    CONSTRAINT [PK_workflowconiguration_PSY] PRIMARY KEY CLUSTERED ([WFCId_PSY] ASC)
);

