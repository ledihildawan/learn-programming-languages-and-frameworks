package main

import (
	"fmt"
	"math"
)

const inflationRate = 2.5

func outputText(text string) {
	fmt.Print(text)
}

func calculateFutureValues(investmentAmount, expectedReturnRate, years float64) (float64, float64) {
	fv := investmentAmount * math.Pow((1+expectedReturnRate/100), years)
	rfv := fv / math.Pow(1+inflationRate/100, years)

	return fv, rfv
}

func getUserInput(text string) float64 {
	var userInput float64

	outputText(text)
	fmt.Scan(&userInput)

	return userInput
}

func main() {
	investmentAmount := getUserInput("Investment Amount: ")
	expectedReturnRate := getUserInput("Expected Return Rate: ")
	years := getUserInput("Years: ")

	futureValue, futureRealValue := calculateFutureValues(investmentAmount, expectedReturnRate, years)

	formattedFV := fmt.Sprintf("Future Value: %.1f\n", futureValue)
	formattedRFV := fmt.Sprintf("Future Value (adjusted for Inflation): %.1f\n", futureRealValue)

	fmt.Print(formattedFV, formattedRFV)
}
