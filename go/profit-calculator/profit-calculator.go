package main

import (
	"fmt"
)

func outputText(text string) {
	fmt.Print(text)
}

func calculateFinances(revenue, expenses, taxRate float64) (float64, float64, float64) {
	ebt := revenue - expenses
	profit := ebt * (1 - taxRate/100)
	ratio := ebt / profit

	return ebt, profit, ratio
}

func getUserInput(text string) float64 {
	var userInput float64

	outputText(text)
	fmt.Scan(&userInput)

	return userInput
}

func main() {
	revenue := getUserInput("Revenue: $ ")
	expenses := getUserInput("Expenses: $ ")
	taxRate := getUserInput("Tax Rate (%): $ ")

	ebt, profit, ratio := calculateFinances(revenue, expenses, taxRate)

	fmt.Printf("EBT (Earnings Before Tax): $ %.2f\n", ebt)
	fmt.Printf("Profit: $ %.2f\n", profit)
	fmt.Printf("Ratio: %.2f%%\n", ratio)
}
