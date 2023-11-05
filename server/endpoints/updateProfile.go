package endpoints
import(
	"github.com/gin-gonic/gin"
	"server/Models"
	"server/DB"
	//"net/http"
)
func UpdateProfile(c *gin.Context) {
	var profile models.Profile
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	
	if err := DB.DBconn.Model(&profile).Where("id = ?", c.Param("id")).Updates(profile).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	
	c.JSON(200, profile)
}