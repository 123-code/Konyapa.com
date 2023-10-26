package auth

import (
	"context"

	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"encoding/json"
	"net/http"
	"server/models"

	"server/config"
	//"github.com/golang-jwt/jwt"
	//"github.com/google/uuid"
)
func GoogleLogin(c *gin.Context){
	googleConfig := config.SetupConfig()
	url := googleConfig.AuthCodeURL("randomstate")
	c.Redirect(http.StatusMovedPermanently, url)
}


 func GoogleCallback(c *gin.Context){
	
	
	state := c.Query("state")
	if state != "randomstate" {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	code := c.Query("code")
	googleConfig := config.SetupConfig()
	token,err := googleConfig.Exchange(context.Background(),code)
if err != nil{
	fmt.Println(c,"could not get token")
	
}

	resp,err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
if err != nil{
	fmt.Println(c,"could not create get request")
	 
} 


userData,err := ioutil.ReadAll(resp.Body)
if err != nil{
	fmt.Println("could not parse response")
}

err = json.Unmarshal(userData, &models.GoogleUserInfo{})
    if err != nil {
        fmt.Println("could not parse user ID")
        return
    }


var googleUser models.GoogleUserInfo
googleUser.Googleid = "googleid"
googleUser.Email = "email"
googleUser.Given_name = "given_name"
googleUser.Family_name = "family_name"
googleUser.Picture = "picture"
googleUser.Locale = "locale"

DBconn.Create(&googleUser)

c.JSON(http.StatusOK,gin.H{"message": "success"})







	

 }