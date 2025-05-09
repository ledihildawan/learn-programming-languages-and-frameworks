package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"example.com/project-note/note"
)

func prompt(text string) string {
	print(text)

	reader := bufio.NewReader(os.Stdin)

	text, err := reader.ReadString('\n')

	if err != nil {
		return ""
	}

	text = strings.TrimSuffix(text, "\n")
	text = strings.TrimSuffix(text, "\r")

	return text
}

func getNoteData() (string, string) {
	title := prompt("Note title: ")
	content := prompt("Note content: ")

	return title, content
}

func main() {
	title, content := getNoteData()

	newNote, err := note.New(title, content)

	if err != nil {
		fmt.Println(err)
		return
	}

	newNote.Display()
	err = newNote.Save()

	if err != nil {
		fmt.Println("Saving the note failed.")
		return
	}

	fmt.Println("Saving the note succeeded!")
}
