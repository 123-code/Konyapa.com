package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
    "server/DB"
	"github.com/gin-contrib/cors"
    "server/endpoints"
	"os"
)






func init(){
	DB.DBconnect()
}

func hello(c *gin.Context) {
	c.String(http.StatusOK, "Hello World")
}

func main() {
	router := gin.Default();

	router.Use(cors.Default())


    router.GET("/",hello);
	router.GET("/getalldata",endpoints.GetReservas);
	router.POST("/createstore",endpoints.CreateNegocio);
	router.POST("/createprofile",endpoints.CreateProfile);
port := os.Getenv("PORT")
	if(port == ""){
port = "8080"
	}
	router.Run("0.0.0.0:"+port);
	
}