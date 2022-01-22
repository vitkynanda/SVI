package models

import "time"

type Article struct {
	Id           	uint   		`json:"id"`
	Title        	string 		`json:"title"`
	Content      	string 		`json:"content"`
	Category     	string 		`json:"category"`
	Created_date 	time.Time	`json:"created_date"`
	Updated_date	time.Time	`json:"updated_date"`
	Status			string		`json:"status"`
}