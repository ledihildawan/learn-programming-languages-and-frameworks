package main;

import (
	"fmt"
	"net/http"
)

const PORT = 8080

type application struct {

}

func main() {
	var app application

	app.Domain = "example.com"

	err := http.ListenAndServe(fmt.Sprintf(":%d", PORT), null)

	if err != nil {
		log.Fatal(err)
	}
}
