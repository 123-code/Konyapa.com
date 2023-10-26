package auth

import (
	
	"log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"server/Models"
	//"os" 
  )

  var DBconn *gorm.DB

func DBconnect(){
	var err error;

	dsn := "..."
	DBconn, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	DBconn.AutoMigrate(&models.Profile{});
	DBconn.AutoMigrate(&models.NombreNegocio{});
	//DBconn.AutoMigrate(&models.Reserva{});
 
if err != nil{ 
	log.Fatal("Failded to connect to database")
}

}