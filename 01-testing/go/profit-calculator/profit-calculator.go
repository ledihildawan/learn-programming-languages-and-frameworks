package main

import (
	"fmt"
	"os"
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

func getUserInput(text string, name string) float64 {
	var userInput float64

	outputText(text)
	fmt.Scan(&userInput)

	if userInput < 0 {
		panic("Invalid input: " + name + " should greater than 0.")
	}

	return userInput
}

func storeResults(ebt, profit, ratio float64) {
	results := fmt.Sprintf("EBT (Earnings Before Tax): $ %.1f\nProfit: $ %.1f\nRatio: %.3f", ebt, profit, ratio)
	os.WriteFile("results.txt", []byte(results), 0644)
}

func main() {
	revenue := getUserInput("Revenue: $ ", "revenue")
	expenses := getUserInput("Expenses: $ ", "expense")
	taxRate := getUserInput("Tax Rate (%): ", "tax rate")

	ebt, profit, ratio := calculateFinances(revenue, expenses, taxRate)

	fmt.Printf("EBT (Earnings Before Tax): $ %.1f\n", ebt)
	fmt.Printf("Profit: $ %.1f\n", profit)
	fmt.Printf("Ratio: %.3f\n", ratio)

	storeResults(ebt, profit, ratio)
}
