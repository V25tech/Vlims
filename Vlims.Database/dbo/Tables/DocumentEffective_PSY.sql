CREATE TABLE [dbo].[DocumentEffective_PSY] (
    [DEID_PSY]              INT            IDENTITY (1, 1) NOT NULL,
    [Documentmanagerid_PSY] NVARCHAR (50)  NOT NULL,
    [documenttitle_PSY]     NVARCHAR (100) NOT NULL,
    [documentno_PSY]        NVARCHAR (160) NOT NULL,
    [documenttype_PSY]      NVARCHAR (150) NOT NULL,
    [department_PSY]        NVARCHAR (150) NOT NULL,
    [document_PSY]          NVARCHAR (500) NULL,
    [EffectiveDate_PSY]     DATETIME       NULL,
    [Reviewdate_PSY]        DATETIME       NULL,
    [CreatedBy_PSY]         NVARCHAR (100) NULL,
    [CreatedDate_PSY]       DATETIME       NULL,
    [ModifiedBy_PSY]        NVARCHAR (100) NULL,
    [ModifiedDate_PSY]      DATETIME       NULL,
    [Status_PSY]            NVARCHAR (50)  NULL,
    [Refrence_PSY]          INT            NULL,
    [Workflow_PSY] NVARCHAR(200) NULL, 
    [GUID_DE] UNIQUEIDENTIFIER NULL, 
    [ReferenceGuid_PSY] UNIQUEIDENTIFIER NULL, 
    CONSTRAINT [PK_DocumentEffective_PSY] PRIMARY KEY CLUSTERED ([DEID_PSY] ASC)
);





