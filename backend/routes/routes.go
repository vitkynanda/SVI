package routes

import (
	"log"
	"net/http"

	"post-api/controllers"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func HandleRequest() {
    myRouter := mux.NewRouter().StrictSlash(true)
    
    myRouter.HandleFunc("/article/{limit}/{offset}", controllers.GetAllArticle).Methods("GET", "OPTIONS")
    myRouter.HandleFunc("/article", controllers.CreateArticle).Methods("POST", "OPTIONS")
    myRouter.HandleFunc("/article/{id}", controllers.GetArticleById).Methods("GET", "OPTIONS")
    myRouter.HandleFunc("/article/{id}", controllers.UpdateArticle).Methods("POST", "OPTIONS")
    myRouter.HandleFunc("/article/{id}/delete", controllers.DeleteArticle).Methods("POST", "OPTIONS")
    
    cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"content-type"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowCredentials(),
	)

	myRouter.Use(cors)

    log.Fatal(http.ListenAndServe(":11000", myRouter))
}