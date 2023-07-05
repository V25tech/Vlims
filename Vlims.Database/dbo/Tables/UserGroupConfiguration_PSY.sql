CREATE TABLE [dbo].[UserGroupConfiguration_PSY] (
    [Ugcid_PSY]            INT            IDENTITY (1, 1) NOT NULL,
    [Usermanagementid_PSY] NVARCHAR (50)  NOT NULL,
    [Usergroupname_PSY]    NVARCHAR (50)  NULL,
    [Code_PSY]             NVARCHAR (50)  NULL,
    [Users_PSY]            NVARCHAR (50)  NULL,
    [Totalusers_PSY]       INT            NULL,
    [CreatedBy_PSY]        NVARCHAR (100) NULL,
    [CreatedDate_PSY]      DATETIME       NULL,
    [ModifiedBy_PSY]       NVARCHAR (100) NULL,
    [ModifiedDate_PSY]     DATETIME       NULL,
    CONSTRAINT [PK_UserGroupConfiguration_PSY] PRIMARY KEY CLUSTERED ([Ugcid_PSY] ASC)
);

