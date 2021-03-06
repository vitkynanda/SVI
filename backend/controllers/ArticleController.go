package controllers

import (
	"fmt"
	"go-api/connection"
	"go-api/models"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func GetAllArticles(c *gin.Context) {
	articles := []models.Article{}
	err := connection.DB.Find(&articles).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message" : "Internal server error"})
	}
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Get all articles successfully", "data": articles})
}

func PaginationPostedArticle(c *gin.Context) {
	limit,_ := strconv.Atoi(c.Param("limit"))
	offset, _ := strconv.Atoi(strings.Trim(c.Param("offset"), " "))

	articles := []models.Article{}
	
	sql := "SELECT * FROM articles"
	if offset == 0 {
		sql = fmt.Sprintf("%s LIMIT %d", sql, limit)
	} else {
		sql = fmt.Sprintf("%s LIMIT %d , %d", sql, limit ,offset)
	}

	
	if err := connection.DB.Raw(sql).Scan(&articles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "Internal Server Error", "errors": "Failed to find article"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Get article page successfully",  "data": articles})
}

func GetArticleById(c *gin.Context) {
	id := c.Param("id")
	article := models.Article{}
	err := connection.DB.Where("id = ?", id).Find(&article).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message" : "Internal server error"})
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Get article by id successfully", "data" : article})
}

func CreateNewArticle(c *gin.Context) {

	article := models.Article{
		Created_date: time.Now(),
		Updated_date: time.Now(),
	}
	
	if err := c.ShouldBindJSON(&article); err != nil {
	errorMessages :=  []string{}

	for _, e :=  range err.(validator.ValidationErrors) {
		tag := e.ActualTag()
		field := e.Field()

		if 	tag == "min" {
			switch field {
			case "Title":
				tag = "minimum 20 characters"
				break
			case  "Content":
				tag = "minimum 200 characters"
				break
			case  "Category":
				tag = "minimum 3 characters"
				break
			}
			
		}

		errorMessage := fmt.Sprintf("Error on Field %s, condition: %s", field, tag)
		errorMessages = append(errorMessages,  errorMessage)

		}
		c.JSON(http.StatusBadRequest, gin.H{"status": "Bad request", "errors": errorMessages})
		return
	}

	if errDB := connection.DB.Create(&article).Error; errDB != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "Internal Server Error", "errors": "Failed create article"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Create article  successfully",  "data" : article})
}

func UpdateArticle(c *gin.Context) {

	id := c.Param("id")

	article := models.Article{
		Updated_date: time.Now(),
	}

	if err := c.ShouldBindJSON(&article); err != nil {
	errorMessages :=  []string{}
	
	for _, e :=  range err.(validator.ValidationErrors) {
		tag := e.ActualTag()
		field := e.Field()
		if 	tag == "min" {
			switch field {
			case "Title":
				tag = "minimum 20 characters"

			case  "Content":
				tag = "minimum 200 characters"

			case  "Category":
				tag = "minimum 3 characters"

			}
			
		}

		errorMessage := fmt.Sprintf("Error on Field %s, condition: %s", field, tag)
		errorMessages = append(errorMessages,  errorMessage)
		}
		c.JSON(http.StatusBadRequest, gin.H{"status": "Bad request", "errors": errorMessages})
		return
	}

	if errDB := connection.DB.Model(&models.Article{}).Where("id = ?", id).Updates(map[string]interface{}{
		"title": article.Title,
		"content": article.Content,
		"category": article.Category,
		"updated_date": article.Updated_date,
		"status": article.Status,
	}).Error; errDB != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "Internal Server Error", "errors": "Failed update   article"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Update article  successfully",  "data" : article})
}

func DeleteArticleById(c *gin.Context) {
	id := c.Param("id")
	err := connection.DB.Delete(&models.Article{}, id).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "Internal Server Error", "errors": "Failed delete   article"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Article deleted successfully"})
}