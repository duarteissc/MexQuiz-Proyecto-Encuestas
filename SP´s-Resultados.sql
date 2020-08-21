---------------------------------------------USER------------------------------------------
USE MxQuiz
GO
-----GETID
-----Verificar si el usuario ya  voto x esa encuesta
ALTER PROCEDURE dbo.sp_verVee
@username nvarchaR(200),
@contraseña nvarchaR(200),
@IdEncuesta int
AS
DECLARE @IDUser int;
SET @IDUser=(SELECT Id From Users WHERE Username=@username and Contraseña=@contraseña and Estatus=1);
Select *from eR Where IdUser=@IDUser and IdeC=@IdEncuesta 
Go
dbo.sp_verVee 'diego','7cc7b8a9e8c500509d2b85acae734e700676f11e45f2338370e3421f8a80ae66',1
----POST
-----Nuevo voto a  xEncuesta
ALTER PROCEDURE sp_newve
@username nvarchaR(100),
@contraseña nvarchaR(100),
@IdEncuesta int,
@af int,
@en int,
@nul int
AS
BEGIN TRY
BEGIN TRANSACTION
DECLARE @IDUser int
SELECT @IDUser=Id From Users WHERE Username=@username and Contraseña=@contraseña and Estatus=1;
INSERT INTO eR(IdUser,IdeC,Afavor,Encontra,Nulo)VALUES(@IDUser,@IdEncuesta,@af,@en,@nul)
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Nuevo voto a  xEncuesta
Alter PROCEDURE sp_puter
@username nvarchaR(100),
@contraseña nvarchaR(100),
@IdEncuesta int,
@af int,
@en int,
@nul int
AS
BEGIN TRY
BEGIN TRANSACTION
DECLARE @IDUser int
SELECT @IDUser=Id From Users WHERE Username=@username and Contraseña=@contraseña and Estatus=1;
update eR set Afavor=@af,Encontra=@en,Nulo=@nul where IdeC=@IdEncuesta and IdUser=@IDUser
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

-----GETID
-----Resultados
ALTER PROCEDURE dbo.sp_Resultados
@IdEncuesta int
AS
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM eR I WHERE IdeC=@IdEncuesta AND Estado=1

Go

SELECT SUM(I.Afavor) AS Afavor,SUM(I.Encontra)AS Encontra,SUM(I.Nulo)AS Nulo FROM eR I WHERE IdeC=@IdEncuesta AND Estado=1
SELECT coalesce(SUM(I.Afavor),0) AS Afavor,coalesce(SUM(I.Encontra),0)AS Encontra,coalesce(SUM(I.Nulo),0) AS Nulo FROM eR I WHERE IdeC=1 AND Estado=1
SELECT *from eR