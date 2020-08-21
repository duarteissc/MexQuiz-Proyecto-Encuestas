USE MxQuiz
GO
------GETALL
------Obtener todos los banners
CREATE PROCEDURE dbo.sp_getAllBanners
AS
Select *from eBanners  Where Estado=1
Go
------GETBYTIPODEENCUESTA
------Obtener todos los banners por id con Estado=1 
CREATE PROCEDURE dbo.sp_getBannerbyId
@id int
AS
Select *from eBanners  Where Id=@id and Estado=1
Go
------GETBYTIPODEENCUESTA
------Obtener todos los banners por idencuesta con EStado=1 
CREATE PROCEDURE dbo.sp_getbyIdEncuesta
@id int
AS
Select *from eBanners  Where IdeC=@id and Estado=1
Go
----POST
-----Nuevo Banner--------------ADMIN
ALTER PROCEDURE sp_nuevoBanner
@idEncuesta int,
@url_Banner nvarchaR(500)
AS
BEGIN TRY
BEGIN TRANSACTION
INSERT INTO eBanners(IdeC,URL_Banner)VALUES(@idEncuesta,@url_Banner)
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----PUT
----Actualizar url_Banner-------ADMIN
ALTER PROCEDURE sp_actualizarBanner
@id int,
@url_Banner nvarchaR(500)
AS
BEGIN TRY
BEGIN TRANSACTION
update eBanners set URL_Banner=@url_Banner where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO
----DELETE
----Borrar Banner---------------ADMIN
CREATE PROCEDURE sp_borrarBanner
@id int
AS
BEGIN TRY
BEGIN TRANSACTION
update eBanners set Estado=0 where Id=@Id
COMMIT TRANSACTION
END TRY
BEGIN CATCH
PRINT'ERROR!'
ROLLBACK
END CATCH
GO

EXEC sp_nuevoBanner 1,'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1-8YgwzSDp96_biY7Og_PxAGEKF-yKDpj'
EXEC sp_nuevoBanner 2,'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1jd4af5SmngQbmdeoE4dDovCo0yIRHHQe'
EXEC sp_nuevoBanner 1,'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1oiNBA6HWI_vM2OzV1w32hEimeIvxzS3h'
SELECT *FROM eCatalogo
SELECT *FROM eBanners
EXEC sp_nuevoBanner 2,'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1oehy-LIAKUufrMCcp8uYGLNaYjwmmDTW'
EXEC sp_nuevoBanner 2,'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1aLvqtC8toVs4vzvu2dTIopuJ8Vl-XcuS'
EXEC sp_nuevoBanner 2,'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1-OZ0ZJIqOcUHBWtVkgG1tCwWeyn2seFo'
https://drive.google.com/file/d//view?usp=sharing
https://drive.google.com/file/d//view?usp=sharing
https://drive.google.com/file/d//view?usp=sharing