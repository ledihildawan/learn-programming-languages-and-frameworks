// Core Concepts of OOP
// Objects: Self contained unit that encapsulates properties and methods
// Classes: Blueprint or template to create and use an object
// Inheritance: Allows one class to inherit properties/methods from another
// Encapsulation: Bundling the data and methods into a single unit
// Polymorphism: Allow objects of different classes to be treated as objects of common superclass

// Benefits of OOP
// Modularity, Reusability, Scalability, Abstraction

<?php

interface Customer {
    public function report();
}

class User implements Customer {
    public $name;
    public $email;

    public function _constcurt($name, $email) {
        $this->name = $name;
        $this->email = $email;
    }

    public function login() {
        echo $this->name . ' logged in <br>';
    }

    public function report() {
        echo 'report';
    }
}

$user1 = new User('John Doe', 'johndoe@gmail.com');
