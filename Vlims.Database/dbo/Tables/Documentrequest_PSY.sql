CREATE TABLE [dbo].[Documentrequest_PSY] (
    [DRID_PSY]              INT            IDENTITY (1, 1) NOT NULL,
    [documentmanagerid_PSY] NVARCHAR (50)  NOT NULL,
    [documenttype_PSY]      NVARCHAR (150) NULL,
    [department_PSY]        NVARCHAR (150) NOT NULL,
    [Purpose_PSY]           NVARCHAR (MAX) NULL,
    [ApprovalsCount_PSY]    INT            NULL,
    [AssigntoGroup_PSY]     NVARCHAR (50)  NULL,
    [CreatedBy_PSY]         NVARCHAR (100) NULL,
    [CreatedDate_PSY]       DATETIME       NULL,
    [ModifiedBy_PSY]        NVARCHAR (100) NULL,
    [ModifiedDate_PSY]      DATETIME       NULL,
    [Status_PSY]            NVARCHAR (100) NULL,
    [Approvedby_PSY]        NVARCHAR (100) NULL,
    [ApprovedON_PSY]        DATETIME       NULL,
    [Workflow_PSY]          NVARCHAR (100) NULL,
    [GUID_DR] UNIQUEIDENTIFIER NULL, 
    CONSTRAINT [PK_Documentrequest_PSY] PRIMARY KEY CLUSTERED ([DRID_PSY] ASC)
);





