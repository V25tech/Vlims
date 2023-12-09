CREATE TABLE [dbo].[UserConfiguration_PSY] (
    [UCFId_PSY]            INT            IDENTITY (1, 1) NOT NULL,
    [UserManagementID_PSY] NVARCHAR (50)  NOT NULL,
    [FirstName_PSY]        NVARCHAR (50)  NULL,
    [LastName_PSY]         NVARCHAR (50)  NULL,
    [UserID_PSY]           NVARCHAR (50)  NULL,
    [Department_PSY]       NVARCHAR (50)  NULL,
    [Role_PSY]             NVARCHAR (50)  NULL,
    [Doj_PSY]              NVARCHAR (50)  NULL,
    [Empid_PSY]            INT            NULL,
    [EmailId_PSY]          NVARCHAR (50)  NULL,
    [Activedirectory_PSY]  NVARCHAR (50)  NULL,
    [Standarduser_PSY]     NVARCHAR (50)  NULL,
    [CreatedBy_PSY]        NVARCHAR (100) NULL,
    [CreatedDate_PSY]      DATETIME       NULL,
    [ModifiedBy_PSY]       NVARCHAR (100) NULL,
    [ModifiedDate_PSY]     DATETIME       NULL,
    [Status_PSY]           NVARCHAR (50)  NULL,
    [Password_PSY] NVARCHAR(200) NULL, 
    [InvAttemt_PSY] BIT NULL, 
    CONSTRAINT [PK_UserConfiguration_PSY] PRIMARY KEY CLUSTERED ([UCFId_PSY] ASC)
);



