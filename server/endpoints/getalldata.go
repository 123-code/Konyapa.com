package endpoints

import (
	"server/DB"
	"server/Models"

	"github.com/gin-gonic/gin"
)

func GetReservas(c *gin.Context){
	var profiles []models.Profile
	DB.DBconn.Find(&profiles);
   c.JSON(200,gin.H{
	   "profiles":profiles,
   })
}