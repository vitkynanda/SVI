package controllers

import (
	"encoding/json"
	"net/http"
	"post-api/connection"
	"post-api/models"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

var Response map[string]interface{} = make(map[string]interface{})

func GetAllArticle(w http.ResponseWriter, r *http.Request) {
	Var := mux.Vars(r)
	offset, _ := strconv.Atoi(Var["offset"])
	limit, _ := strconv.Atoi(Var["limit"])

	articles := []models.Article{}
	err := connection.DB.Find(&articles).Limit(limit).Offset(offset).Error

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	Response["data"] = articles
	Response["status_code"] = 200
	Response["message"] = "Get All Article Successfully!"
	
	json.NewEncoder(w).Encode(Response)
	return
}

func CreateArticle(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	payload := models.Article{
		Created_date: time.Now(),
		Updated_date: time.Now(),
	}
	
	if err := decoder.Decode(&payload); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := connection.DB.Create(&payload).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	Response["data"] = payload
	Response["status_code"] = 200
	Response["message"] = "Article has been created successfuly!"

	json.NewEncoder(w).Encode(Response)
}

func GetArticleById(w http.ResponseWriter, r *http.Request) {
	Var := mux.Vars(r)	
	id, _ := strconv.Atoi(Var["id"])

	article := models.Article{}
	err := connection.DB.Where("id = ?", id).Find(&article).Error

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	Response["data"] = article
	Response["status_code"] = 200
	Response["message"] = "Get Article Successfully!"
	
	json.NewEncoder(w).Encode(Response)
	return
}

func UpdateArticle(w http.ResponseWriter, r *http.Request) {
	Var := mux.Vars(r)	
	id, _ := strconv.Atoi(Var["id"])

	decoder := json.NewDecoder(r.Body)
	payload := models.Article{
		Updated_date: time.Now(),
	}
	
	if err := decoder.Decode(&payload); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := connection.DB.Model(&models.Article{}).Where("id = ?", id).Updates(map[string]interface{}{
		"title": payload.Title,
		"content": payload.Content,
		"category": payload.Category,
		"updated_date": payload.Updated_date,
		"status": payload.Status,
	}).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	Response["data"] = payload
	Response["status_code"] = 200
	Response["message"] = "Article has been updated successfuly!"

	json.NewEncoder(w).Encode(Response)
	return
}

func DeleteArticle(w http.ResponseWriter, r *http.Request) {
	Var := mux.Vars(r)	
	id, _ := strconv.Atoi(Var["id"])

	connection.DB.Delete(&models.Article{}, id)
	
	Response["data"] = nil
	Response["status_code"] = 200
	Response["message"] = "Article has been deleted successfuly!"

	json.NewEncoder(w).Encode(Response)
	return
}
