var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var textColor = document.getElementById("text-color");
var bgColor = document.getElementById("bg-color");
var body = document.body;

textColor.addEventListener("input", function () {
	body.style.color = this.value;
});

bgColor.addEventListener("input", function () {
	body.style.backgroundColor = this.value;
});

function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	ul.prepend(li);
	li.appendChild(createDelBtn());
	input.value = "";
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

function toggleDoneList(event) {
	event.target.classList.toggle("done");
}

function createDelBtn() {
	var delBtn = document.createElement("button");
	delBtn.innerText = "del";
	return delBtn;
}

function deleteListItem(event) {
	event.target.parentElement.remove();
}

document.querySelectorAll("li").forEach(function(li) {
	li.appendChild(createDelBtn());
});

ul.addEventListener("click", function (e) {
	if (e.target.tagName === "LI") {
		toggleDoneList(e);
	}

	if (e.target.tagName === "BUTTON") {
		deleteListItem(e)
	}
});

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);