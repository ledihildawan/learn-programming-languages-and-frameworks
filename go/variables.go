package main

import "fmt"

func main() {
	var favColor = "Blue"
	fmt.Println("my favorite color is", favColor)

	var birthYear, ageInYears = 1997, 26
	fmt.Println("Born in", birthYear, "aged", ageInYears, "years")

	var (
		firstInitial = "L",
		lastInitial = "H"
	)
	fmt.Println("Initials=", firstInitial, lastInitial)

	var ageInDays int
	ageInDays = 365 * ageInYears
	fmt.Println("I am", ageInDays, "days old")
}
