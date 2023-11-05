package endpoints

import (
	"net/http"
	"server/DB"
	"server/Models"
	"github.com/gin-gonic/gin"
	//"github.com/google/uuid"
	"fmt"
)

func CreateNegocio(c *gin.Context) {

	var reqbody struct {
		Nombre string
		Productos   string
		Direccion string
		Web string
		Email string


	}
	if err := c.Bind(&reqbody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}
/*
	var profile models.Profile
	result := DB.DBconn.First(&profile, reqbody.Propietario)
	if result.Error != nil {
		fmt.Println("ID",reqbody.Propietario)
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}
*/

		negocio := models.NombreNegocio{
		Nombre:    reqbody.Nombre,
		Productos: reqbody.Productos,
		Direccion: reqbody.Direccion,
		Web:       reqbody.Web,
		Email: reqbody.Email,
	}
	DB.DBconn.Create(&negocio)
	c.JSON(http.StatusOK, gin.H{"message": "NombreNegocio created successfully"});
}

