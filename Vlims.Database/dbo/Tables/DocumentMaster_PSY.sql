CREATE TABLE [dbo].[DocumentMaster_PSY] (
    [Dmid_PSY]                        INT            IDENTITY (1, 1) NOT NULL,
    [Documentypeconfiguration_PSY]    NVARCHAR (50)  NULL,
    [Documentemplateonfiguration_PSY] NVARCHAR (50)  NULL,
    [WorkFlowConfiguration_PSY]       NVARCHAR (50)  NULL,
    [NotificationConfiguration_PSY]   NVARCHAR (50)  NULL,
    [DashboardConfiguration_PSY]      NVARCHAR (50)  NULL,
    [CreatedBy_PSY]                   NVARCHAR (100) NULL,
    [CreatedDate_PSY]                 DATETIME       NULL,
    [ModifiedBy_PSY]                  NVARCHAR (100) NULL,
    [ModifiedDate_PSY]                DATETIME       NULL,
    CONSTRAINT [PK_DocumentMaster_PSY] PRIMARY KEY CLUSTERED ([Dmid_PSY] ASC)
);

