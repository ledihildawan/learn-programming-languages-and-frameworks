package main

import "fmt"

func main() {
	var example = 3
	var exampleTwo int = 3
	var exampleThree int

	exampleThree = 3

	var a, b, c = 1, 2, "sample"

	var (
		aTwo int = 1
		bTwo int = 1
		cTwo     = "sample"
	)

	exampleFour := 3
	aThree, bThree := 1, "sample"

	a := 1
	a = 2
	a = 3
	a := 1
	b := a
	c = b

	var myName = "Ledi Hildawan"
	fmt.Println("my name is", myName, myName)

	var name string = "Delis"
	fmt.Println("name =", name)

	userName := "admin"
	fmt.Println("username =", username)

	var sum int
	fmt.Println("The sum is", sum)

	part1, other := 1, 5
	fmt.Println("part 1 is", part1, "other is", other)

	part2, other := 2, 0
	fmt.Println("part 2 is", part2, "other is", other)

	sum = part1 + part2
	fmt.Println("sum =", sum)

	var (
		lessonName = "Varibales"
		lessonType = "Demo"
	)
	fmt.Println("lessonName =", lessonName)
	fmt.Println("lessonType =", lessonType)

	word1, word2, _ = "hello", "world", "!"
	fmt.Println(word1, word2)
}
