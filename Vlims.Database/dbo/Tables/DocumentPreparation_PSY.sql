CREATE TABLE [dbo].[DocumentPreparation_PSY] (
    [DPNID_PSY]             INT            IDENTITY (1, 1) NOT NULL,
    [Documentmanagerid_PSY] NVARCHAR (50)  NOT NULL,
    [documenttitle_PSY]     NVARCHAR (50)  NULL,
    [documentno_PSY]        NVARCHAR (50)  NULL,
    [documenttype_PSY]      NVARCHAR (50)  NULL,
    [department_PSY]        NVARCHAR (50)  NULL,
    [document_PSY]          VARCHAR (500)  NULL,
    [template_PSY]          NVARCHAR (50)  NULL,
    [wokflow_PSY]           NVARCHAR (50)  NULL,
    [details_PSY]           NVARCHAR (50)  NULL,
    [CreatedBy_PSY]         NVARCHAR (100) NULL,
    [CreatedDate_PSY]       DATETIME       NULL,
    [ModifiedBy_PSY]        NVARCHAR (100) NULL,
    [ModifiedDate_PSY]      DATETIME       NULL,
    [Status_PSY]            NVARCHAR (100) NULL,
    [DOCStatus_PSY]         NVARCHAR (50)  NULL,
    [Refrence_PSY]          INT            NULL,
    CONSTRAINT [PK_DocumentPreparation_PSY] PRIMARY KEY CLUSTERED ([DPNID_PSY] ASC)
);







