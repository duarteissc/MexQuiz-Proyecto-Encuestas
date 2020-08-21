CREATE DATABASE MxQuiz
GO 
USE MxQuiz
GO
SELECT *fROM Users
SELECT *fROM eR
go
CREATE TABLE Users
(
Id int PRIMARY KEY IDENTITY (1,1)NOT NULL,
Nombre nvarchar(50) not null,
Apellidop nvarchar(50) not null,
Apellidom nvarchar(50) not null,
Username nvarchar(50) not null,
Contraseña nvarchar(200) not null,
Correo nvarchar(100) not null,
fdn nvarchar(100) not null,
sexo nvarchar(50) not null,
Estado nvarchar(100) not null,
Municipio nvarchar(100) not null,
_Role int Default 0,
Estatus  tinyint Default 1 not null,
CONSTRAINT UQ_Nick UNIQUE(Username)
)
GO
CREATE TABLE cType
(
Id int PRIMARY KEY IDENTITY (1,1)NOT NULL ,
Nombre nvarchar(100) NOT NULL,
Estado int Default 1,
CONSTRAINT UQ_NameType UNIQUE(Nombre)
)
GO
CREATE TABLE eCatalogo
(
Id int PRIMARY KEY IDENTITY (1,1)NOT NULL ,
Nombre nvarchar(100) NOT NULL,
Descripcion nvarchar(500) NOT NULL,
URL_Documento nvarchar(500),
URL_Imagen nvarchar(500) NOT NULL,
Prioridad int Default 1,
Tipo int FOREIGN KEY REFERENCES cType(Id)
ON DELETE CASCADE
ON UPDATE CASCADE,
Estado int Default 1
)
GO
CREATE TABLE eR
(
Id int PRIMARY KEY IDENTITY (1,1)NOT NULL ,
IdUser int FOREIGN KEY REFERENCES Users(Id)
ON DELETE CASCADE
ON UPDATE CASCADE,
IdeC int FOREIGN KEY REFERENCES eCatalogo(Id)
ON DELETE CASCADE
ON UPDATE CASCADE,
Afavor int NOT NULL,
Encontra int NOT NULL,
Nulo int NOT NULL,
Estado int Default 1
)
GO
CREATE TABLE eBanners
(
Id int PRIMARY KEY IDENTITY (1,1)NOT NULL ,
IdeC int FOREIGN KEY REFERENCES eCatalogo(Id)
ON DELETE CASCADE
ON UPDATE CASCADE,
URL_Banner nvarchar(500),
Estado int Default 1
)
GO
CREATE TABLE eNews
(
Id int PRIMARY KEY IDENTITY (1,1)NOT NULL ,
Nombre nvarchar(100) NOT NULL,
Descripcion nvarchar(500)NOT NULL,
URL_Documento nvarchar(500),
URL_Imagen nvarchar(500),
Prioridad int Default 1,
Tipo int FOREIGN KEY REFERENCES cType(Id)
ON DELETE CASCADE
ON UPDATE CASCADE,
Estado int Default 1
)
GO


DROP TABLE Users
DROP TABLE eR
DROP TABLE cType
DROP TABLE eNews
DROP TABLE eBanners
DROP TABLE eCatalogo
GO