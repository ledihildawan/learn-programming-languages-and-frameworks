package main

import "fmt"

func main() {
	age := 24

	agePointer := &age

	fmt.Println("Age:", agePointer)

	adultYears := adultYears(&agePointer)
	fmt.Println(age)
}

// func adultYears(age *int) int {
// return *age - 18
func adultYears(age *int) {
	*age = *age - 18
}
