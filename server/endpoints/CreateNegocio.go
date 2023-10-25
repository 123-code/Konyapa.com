package endpoints

import(
	
	"github.com/gin-gonic/gin"
	"server/Models"
	"server/DB"
)

func CreateNegocio(c *gin.Context) {

	var reqbody struct {
		Nombre string
		Productos   string
		Propietario models.Profile
		Direccion string
		Web string
	}
	c.Bind(&reqbody)

	negocio := models.NombreNegocio{
		Nombre: reqbody.Nombre,
		Productos:    reqbody.Productos,
		Propietario: reqbody.Propietario,
		Direccion: reqbody.Direccion,
		Web: reqbody.Web,
	}
	DB.DBconn.Create(&negocio)
}

