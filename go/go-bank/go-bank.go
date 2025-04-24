package main

import (
	"fmt"
)

func main() {
	accountBalance := 1000.00

	fmt.Println("Welcome to Go Bank!")
	fmt.Println("What do you want to do?")
	fmt.Println("1. Check balance")
	fmt.Println("2. Deposit money")
	fmt.Println("3. Withdraw money")
	fmt.Println("4. Exit")

	var choice int
	fmt.Print("Your choice: ")
	fmt.Scan(&choice)

	if choice == 1 {
		fmt.Printf("Your account balance is: %.2f\n", accountBalance)
	} else if choice == 2 {
		var depositAmount float64

		fmt.Print("Your deposit: ")
		fmt.Scan(&depositAmount)

		if depositAmount <= 0 {
			fmt.Println("Invalid amount. Must be greater than 0.")
			return
		}

		accountBalance += depositAmount

		fmt.Println("Balance updated! New amount:", accountBalance)
	} else if choice == 3 {
		var withdrawalAmount float64

		fmt.Print("Withdrawal amount: ")
		fmt.Scan(&withdrawalAmount)

		if withdrawalAmount <= 0 {
			fmt.Println("Invalid amount. Must be greater than 0.")
			return
		}

		if withdrawalAmount > accountBalance {
			fmt.Println("Invalid amount. You can't withdraw more than you have.")
			return
		}

		accountBalance -= withdrawalAmount

		fmt.Println("Balance updated! New amount:", accountBalance)
	} else {
		fmt.Println("Goodbye!")
	}

	fmt.Print("Your choice: ")
}
