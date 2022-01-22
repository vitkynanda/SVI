package main

import (
	"fmt"
	"post-api/connection"
	"post-api/models"
	"post-api/routes"
)

func main() {
	//Connect to DB
	connection.Connect()
	//Migrate Model
	connection.DB.AutoMigrate(&models.Article{})

	//handle Requests
	fmt.Println("Server up and running on port 11000")
	routes.HandleRequest()
}