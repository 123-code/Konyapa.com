package endpoints

import(
	
	"github.com/gin-gonic/gin"
	"server/Models"
	"server/DB"
)


func CreateProfile(c *gin.Context) {
	
	var reqbody struct {
		UserName string
		Email    string
		NegocioName string
	}
	c.Bind(&reqbody)

	var negocio models.NombreNegocio
	DB.DBconn.FirstOrCreate(&negocio, models.NombreNegocio{Nombre: reqbody.NegocioName})


	profile := models.Profile{
		UserName: reqbody.UserName,
		Email:    reqbody.Email,
		Negocios: []models.NombreNegocio{negocio},
	}
	
	DB.DBconn.Create(&profile)
}

