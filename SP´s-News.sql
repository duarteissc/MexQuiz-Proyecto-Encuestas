USE MxQuiz
GO
-----GET
-----Verificar si la noticia ya Existe-----ADMIN
CREATE PROCEDURE dbo.sp_vnew
@nombre nvarchaR(100)
AS
Select *from eNews Where Nombre=@nombre
Go
------GETALLBYId
------Obtener todas las de noticias x id con Estado=1 ----ADMIN
CREATE PROCEDURE dbo.sp_getnewbyId
@Id int
AS
Select *from eNews  Where Id=@Id and Estado=1
Go
------GETALLBYTipo
------Obtener todas las de Noticias x tipo con Estado=1 -----ADMIN
CREATE PROCEDURE dbo.sp_getnewbyTipo
@tipo int
AS
Select *from eNews  Where Tipo=@tipo and Estado=1
Go
------GETALLBYTipoandPrioridad=1 este sp ayudaa en cada categoria html----------------MOSTRAR AL USUARIO Y PARA Q EL ADMIN VERIFIQUE CUALES SON LAS TENDENCIAS Y CAMBIARLOS
------Obtener todas las de Noticias x tipo y  1prioridad con EStado=1 
CREATE PROCEDURE dbo.sp_getAllbyNewsPrioridad
@tipo int
AS
Select *from eNews  Where Tipo=@tipo and Estado=1 and  Prioridad=1
Go
------GETSearch----para user
------Obtener todas las de Noticias by name x categoria
CREATE PROCEDURE dbo.sp_getnewsbyname
@name NVARCHAR(100),
@tipo int
AS
Select *from eNews WHERE Nombre LIKE '%' +@name+ '%' and Estado=1 and Tipo=@tipo
Go
Select *from eNews
----POST
-----Nueva Noticia
ALTER PROCEDURE sp_nuevaNoticia
@Nombre nvarchaR(100),
@Descripcion nvarchaR(500),
@URL_Documento nvarchar(500),
@URL_Imagen nvarchar(500),
@Tipo nvarchaR(100)
AS
BEGIN TRY
BEGIN TRANSACTION
DECLARE @IDtipo int
SELECT @IDtipo=Id From  cType WHERE Nombre=@Tipo
INSERT INTO eNews(Nombre,Descripcion,URL_Documento,URL_Imagen,Tipo)VALUES(@Nombre,@Descripcion,@URL_Documento,@URL_Imagen,@IDtipo)
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

----PUT
-----Quitar Prioridad de Noticia
CREATE PROCEDURE sp_quitarPioridadNoticia
@Id int
AS
BEGIN TRY
BEGIN TRANSACTION
update eNews set Prioridad=0 where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Dar Prioridad de Noticia
CREATE PROCEDURE sp_darPioridadNoticia
@Id int
AS
BEGIN TRY
BEGIN TRANSACTION
update eNews set Prioridad=1 where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Actualizar Nombre de Noticia
CREATE PROCEDURE sp_actualizarNombreNoticia
@Id int,
@Nombre nvarchaR(100)
AS
BEGIN TRY
BEGIN TRANSACTION
update eNews set Nombre=@Nombre where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Actualizar la Descripcion de una Encuesta
CREATE PROCEDURE sp_actualizarDescripcionNoticia
@Id int,
@Descripcion nvarchaR(500)
AS
BEGIN TRY
BEGIN TRANSACTION
update eNews set Descripcion=@Descripcion where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Actualizar la URL del Documento de una Encuesta
ALTER PROCEDURE sp_actualizarURLDocumentoNoticia
@Id int,
@URLDocumento nvarchaR(500)
AS
BEGIN TRY
BEGIN TRANSACTION
update eNews set URL_Documento=@URLDocumento where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
-----Actualizar la URL del Documento de una Encuesta
ALTER PROCEDURE sp_actualizarURLImagenNoticia
@Id int,
@URLImagen nvarchaR(500)
AS
BEGIN TRY
BEGIN TRANSACTION
update eNews set URL_Imagen=@URLImagen where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----DELETE
-----Actualizar Estado de una Encuesta
CREATE PROCEDURE sp_borrarEncuestaNoticia
@Id int
AS
BEGIN TRY
BEGIN TRANSACTION
update eNews set Estado=0 where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
EXEC sp_nuevaNoticia 'Si al Aeropuerto en Texcoco',
'Lorem ipsum dolount eu mi ut, fiue, laoreet blandit molestie quis, ornare sed nibh. Proin laoreet nisl dapibus ipsum tristique, et fermentum sapien convallis. Duis eget dapibus nunc, eu malesuada mauris. Integer sapien purus, pretium in risus sit amet, ultrices malesuada libero. Curabitur ullamcorper, enim ac rhoncus varius, lectus mauris viverra lorem, id pharetra sem magna eu dui. Sed interdum arcu ultricies ipsum aliquet, eu posuere massa finibus. Ut ut lorem fermentum mi mollis bibendum. Vivamus auctor aliquet urna ac tincidunt. 
Sed ornare ligula ac','https://drive.google.com/file/d/1PKgyRO5RCrJK9SEvkrBjQvCsUhYufsZG/view?usp=sharing','https://drive.google.com/uc?export=download&confirm=no_antivirus&id=16cijVt_zYVNA0p_7tol88XZW2y1XPO8d',
'Politica'
EXEC sp_nuevaNoticia 'Si al Aeropuerto en Texcoco',
'Lorem ipsum dolount eu mi ut, fiue, laoreet blandit molestie quis, ornare sed nibh. Proin laoreet nisl dapibus ipsum tristique, et fermentum sapien convallis. Duis eget dapibus nunc, eu malesuada mauris. Integer sapien purus, pretium in risus sit amet, ultrices malesuada libero. Curabitur ullamcorper, enim ac rhoncus varius, lectus mauris viverra lorem, id pharetra sem magna eu dui. Sed interdum arcu ultricies ipsum aliquet, eu posuere massa finibus. Ut ut lorem fermentum mi mollis bibendum. Vivamus auctor aliquet urna ac tincidunt. 
Sed ornare ligula ac','https://drive.google.com/file/d/1WKqpyK7IWKVRnGz7vESqg-Rbc7o8dPTn/view?usp=sharing','https://drive.google.com/uc?export=download&confirm=no_antivirus&id=16cijVt_zYVNA0p_7tol88XZW2y1XPO8d',
'Politica'
https://drive.google.com/file/d//view?usp=sharing
Select *From eNews
sp_actualizarURLImagenNoticia 2,'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1YBv7y4Tt1iVXM2jh1FU9cMOVIo9iik7u'
sp_actualizarURLImagenNoticia 1,'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=16cijVt_zYVNA0p_7tol88XZW2y1XPO8d'

