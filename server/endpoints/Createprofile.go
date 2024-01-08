package endpoints

import (
    "github.com/gin-gonic/gin"
    "server/Models"
    "server/DB"
    "net/http"
)

func CreateProfile(c *gin.Context) {

    var reqbody struct {
        UserName string
        Email    string
        JINombre string
        JIValor  int
        JItype   string
    }

    c.Bind(&reqbody)

    // Check required fields
    if reqbody.UserName == "" || reqbody.Email == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "UserName and Email must not be empty"})
        return
    }

    var existingProfile models.Profile
    result := DB.DBconn.Where("user_name = ?", reqbody.UserName).First(&existingProfile)

    if result.Error == nil {
        c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Username already exists"})
        return
    }

    result = DB.DBconn.Where("email = ?", reqbody.Email).First(&existingProfile)

    if result.Error == nil {
        c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Email already exists"})
        return
    }

    // Create new Profile
    profile := models.Profile{
        UserName: reqbody.UserName,
        Email:    reqbody.Email,
        JINombre: reqbody.JINombre,
        JIValor:  reqbody.JIValor,
        JItype:   reqbody.JItype,
    }

    DB.DBconn.Create(&profile)
}