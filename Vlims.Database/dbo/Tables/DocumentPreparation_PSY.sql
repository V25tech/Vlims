CREATE TABLE [dbo].[DocumentPreparation_PSY] (
    [DPNID_PSY]             INT              IDENTITY (1, 1) NOT NULL,
    [Documentmanagerid_PSY] NVARCHAR (50)    NOT NULL,
    [documenttitle_PSY]     NVARCHAR (500)   NULL,
    [documentno_PSY]        NVARCHAR (150)   NULL,
    [documenttype_PSY]      NVARCHAR (500)   NULL,
    [department_PSY]        NVARCHAR (150)   NULL,
    [template_PSY]          NVARCHAR (200)   NULL,
    [wokflow_PSY]           NVARCHAR (200)   NULL,
    [details_PSY]           NVARCHAR (500)   NULL,
    [CreatedBy_PSY]         NVARCHAR (200)   NULL,
    [CreatedDate_PSY]       DATETIME         NULL,
    [ModifiedBy_PSY]        NVARCHAR (200)   NULL,
    [ModifiedDate_PSY]      DATETIME         NULL,
    [Status_PSY]            NVARCHAR (100)   NULL,
    [DOCStatus_PSY]         NVARCHAR (250)   NULL,
    [Refrence_PSY]          INT              NULL,
    [GUID_DP]               UNIQUEIDENTIFIER NULL,
    [ReferenceGuid_PSY]     UNIQUEIDENTIFIER NULL,
    [document_PSY]          XML              NULL,
    [IsRevision] BIT NULL, 
    CONSTRAINT [PK_DocumentPreparation_PSY] PRIMARY KEY CLUSTERED ([DPNID_PSY] ASC)
);













