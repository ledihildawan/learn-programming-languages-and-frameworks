<?php

$database = [
  hostname => "localhost",
  username => "root",
  password => "",
  dbName => "pdo"
];

try {
  $conn = new PDO("mysql:host=$database['hostname'];dbname=$database['dbName']", $database['username'], $database['password']);
} catch (PDOException $e) {
  echo $e->getMessage();
}

// menampilkan data
$result = $conn->query("SELECT * FROM users");
$total = $result->rowCount();

// die(var_dump($result));

// PDO::FETCH_OBJ, PDO::FETCH_NUM, PDO::FETCH__ASSOC

while ($row = $result->fetch(PDO::FETCH_OBJ)) {
  echo $row->username . "<br />"
}

// Prepared Statement
$name = 'koko';
$pass = '123';

// $query = "INSERT INTO users(username, password) VALUES ('$name', '$pass')";
$sql = "INSERT INTO users(username, password) VALUES (:name, :pass)";
$query = $conn->prepare($sql);

$params = [
  ':name' => $name,
  ':pass' => $pass
];

$query->execute($params);

echo "id terakhir " . $conn->lastInsertId();

// fetach class
class User
{
  public $username, $password, $biodata;

  public function __construct() {
    $this->biodata = $this->username . ' passwordnya adalah ' . $this.password;
  }

  public function getLink() {
    return $this->link = '<a href="user/"' . $this->username . '">' . $this->username . '</a>';
  }
}

$query = $conn->query("SELECT * FROM users");
$query->setFetchMode(PDO::FETCH_OBJ, "User");

while ($row = $query->fetch()) {
  echo $row->getLink() . '<br />';
}