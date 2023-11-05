package endpoints

import(
	"github.com/gin-gonic/gin"
	"server/Models"
	"server/DB"
)
func DeleteProfile(c *gin.Context) {
	if err := DB.DBconn.Where("id = ?", c.Param("id")).Delete(&models.Profile{}).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	
	c.Status(200)
}
