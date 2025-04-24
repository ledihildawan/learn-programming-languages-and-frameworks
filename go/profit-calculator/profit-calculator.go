package main

import (
	"fmt"
)

func main() {
	var revenue, expenses, taxRate float64

	fmt.Println("🧮 Profit Calculator")

	fmt.Print("Revenue: $ ")
	fmt.Scanln(&revenue)

	fmt.Print("Expenses: $ ")
	fmt.Scanln(&expenses)

	fmt.Print("Tax Rate (%): ")
	fmt.Scanln(&taxRate)

	ebt := revenue - expenses
	profit := ebt * (1 - taxRate/100)
	ratio := ebt / profit

	fmt.Println("📊 Result Calculation")

	fmt.Printf("EBT (Earnings Before Tax): $ %.2f\n", ebt)
	fmt.Printf("Profit: $ %.2f\n", profit)
	fmt.Printf("Ratio: %.2f%%\n", ratio)
}
