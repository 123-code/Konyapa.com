package endpoints

import(
	
	"github.com/gin-gonic/gin"
	"server/Models"
	"server/DB"
	"net/http"
)


func CreateProfile(c *gin.Context) {
	
	var reqbody struct {
		UserName string
		Email    string
		NegocioName string
	}
	c.Bind(&reqbody)

	var negocio models.NombreNegocio
	var existingProfile models.Profile 
	if result := DB.DBconn.Where("user_name = ?", reqbody.UserName).First(&existingProfile); result.Error == nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "username already exists"})
		return
	  }
	
	  if result := DB.DBconn.Where("email = ?", reqbody.Email).First(&existingProfile); result.Error == nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "email already exists"}) 
		return
	  }
	DB.DBconn.FirstOrCreate(&negocio, models.NombreNegocio{Nombre: reqbody.NegocioName})


	profile := models.Profile{
		UserName: reqbody.UserName,
		Email:    reqbody.Email,
		//Negocios: []models.NombreNegocio{negocio},
	}
	
	DB.DBconn.Create(&profile)
}

