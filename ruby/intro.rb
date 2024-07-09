# The Basics
# A literal is any notation that lets you represent a fixed value in source code. For instance, all of the following are literals in Ruby: {string | integer | float | boolean | hash | array | symbol | nill} literal

# String

# With double quotes
"The man said, 'Hi there!'"

# With single quotes and escaping
'The man said, \'Hi there!\''

# Concatenation

# With the plus operator
"Hello " + "to " + " Odin!"

# With the shovel operator
"Hello " << "to " << " Odin!"

# With the concat method:
"Welcome ".concat("to ").concat("Odin!")

# Substrings

"hello"[0]
"hello"[0..1]
"hello"[0, 4]
"hello"[-1]

# Escape characters

puts "Hello \n\nHello"

# Interpolation
a = "ten"
name = "Odin"

puts "Hello #{name}"
puts "My favorite number is #{a}"

# Common string methods

"hello".capitalize
"hello".include?("lo")
"hello".include?("z")
"hello".upcase
"hello".downcase
"".empty?
"hello".length
"hello".reverse
"hello world".split
"hello world".split("")
" hello, world  ".strip

# Symbol
:name
:a_symbol
:"surprisingly, this is also a symbol"

# Numbers

# Addition

1 + 1

# Subtraction

2 - 1

# Multiplication

2 * 2

# Division

10 / 5

# Exponent

2 ** 2
3 ** 4

# Modulus (find the reminder of division)
8 % 2
10 % 4

16.remainder(5)
16.divmod(5)

# Integers and float
17 / 5

17 / 5.0

# Converting number types

# To convert an integer to a float:

13.to_f

# To convert a float to an integer:

13.0.to_i
13.9.to_i

# Some useful number methods

# even?

6.even?
7.even?

# ood?

6.odd?
7.odd?

# Array

[1, 2, 3, 4, 5]
[1,2 , 3, 4, 5][0]

# Hash

{
    :dog => 'barks',
    :cat => 'meow',
    :pig => 'oinks',
}

{
    :dog => 'barks',
    :cat => 'meow',
    :pig => 'oinks',
}[:cat]

# Exercise

"Ledi" + " " + "Hildawan"

thousands = 4936 / 1000
hundreds = 4936 % 1000 / 100
tens = 4936 % 1000 % 100 / 10
ones = 4936 % 1000 % 100 % 10

movies = {
    :jaws => 1975,
    :anchorman => 2004,
    :man_of_steel => 2013,
    :a_beautiful_mind => 2001,
    :the_evil_dead => 1981
}

puts movies[:jaws]
puts movies[:anchorman]
puts movies[:man_of_steel]
puts movies[:a_beautiful_mind]
puts movies[:the_evil_dead]

dates = [1975, 2004, 2013, 2001, 1981]

puts dates[0]
puts dates[1]
puts dates[2]
puts dates[3]
puts dates[4]

puts 5 * 4 * 3 * 2 * 1
puts 6 * 5 * 4 * 3 * 2 * 1
puts 7 * 6 * 5 * 4 * 3 * 2 * 1
puts 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1

puts 4.30 * 4.30
puts 6.13 * 6.13
puts 124.34 * 124.34
