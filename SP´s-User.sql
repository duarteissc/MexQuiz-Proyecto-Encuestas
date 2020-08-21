---------------------------------------------User------------------------------------------
USE MxQuiz
GO
-----GETBYNAME
-----Verificar si existe el username para el registro
CREATE PROCEDURE dbo.sp_Nick
@Username nvarchar(255)
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT *FROM Users WHERE Username=@Username;
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

-----POST
----Registrar nuevo Usuario
CREATE PROCEDURE sp_Registrar
---DATOS--
@Nombre nvarchar(255),
@Paterno nvarchar(255),
@Materno nvarchar(255),
@Username nvarchar(255),
@Contraseña nvarchar(255),
@Correo nvarchar(70),
@fdn nvarchar(70),
@Sexo nvarchar(20),
@Estado nvarchar(70),
@Municipio nvarchar(70)
AS
BEGIN TRY
BEGIN TRANSACTION
INSERT INTO Users(Nombre,Apellidop,Apellidom,Username,Contraseña,Correo,fdn,Sexo,Estado,Municipio)VALUES(@Nombre,@Paterno,@Materno,@Username,@Contraseña,@Correo,@fdn,@Sexo,@Estado,@Municipio)
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
-----POST
---Login
CREATE PROCEDURE sp_Login
---DATOS--
@Username nvarchar(150),
@Contraseña nvarchar(150)
AS
BEGIN TRY
BEGIN TRANSACTION
Select *from Users  Where Username=@Username and Contraseña=@Contraseña and Estatus=1
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
-----GET ID
----------verficar si el usuario si existe para actualizar su Contraseña
----------Obtener Id x usename y correo
CREATE PROCEDURE dbo.sp_IdNickEmail
@Username nvarchar(255),
@Correo nvarchar(255)
AS
BEGIN TRY
BEGIN TRANSACTION
SELECT id FROM Users WHERE Username=@Username and Correo=@Correo; 
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
-----PUT
---Actualizar Contraseña
CREATE PROCEDURE sp_UpdatePassword
@Username nvarchaR(150),
@Correo nvarchar(150),
@Password_New nvarchar(150)
AS
BEGIN TRY
BEGIN TRANSACTION
DECLARE @IdUser INT
SET @IdUser=(SELECT Id FROM Users where Username=@Username and Correo=@Correo and Estatus=1)
update Users set Contraseña=@Password_New  where Id=@IdUser and Estatus=1;
SELECT id FROM Users where Id=@IdUser and Estatus=1;
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
SELECT *fROM Users
SELECT *fROM eR
update Users set _Role=1  where Id=4 and Estatus=1;