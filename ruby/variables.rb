age = 18
age = 18 + 5
age = 33
age = age + 4
age += 4
age -= 10

cash = 10
cash *= 2

temprature = 40
temprature /= 10

name = gets.chomp
can_swim = false
desired_location = "Barcelona"
johns_location = desired_location

desired_location.upcase

puts desired_location
puts johns_location

def print_full_name(first_name, last_name)
    name = first_name + " " + last_name

    puts name
end

print_full_name "Ledi", "Hildawan"

puts name

total = 0
[1, 2, 3].each { |number| total += number }
[1, 2, 3].each do |number|
  total += number
end

MY_CONSTANT = 'I am available throughout your app.'
$var = 'I am also available throughout your app.'

# Exercise

puts "What's your name?"
name = gets.chomp
puts name

10.times do
    puts name
end

puts "How old are you?"
puts "In 10 years you will be:"
ageInTenYears = gets.chomp
puts "In 20 years you will be:"
ageInTwentyYears = gets.chomp
puts "In 30 years you will be:"
ageInThirtyYears = gets.chomp
puts "In 40 years you will be:"
ageInFourtyYears = gets.chomp

puts "What's your first name?"
first_name = gets.chomp
puts "What's your last name?"
last_name = gets.chomp
full_name = first_name + " " + last_name
puts "Your full name is " + full_name
