# Fundamental Data Types

# int
# float
print(type(6))
print(type(2 - 4))
print(type(2 * 4))
print(type(2 / 4))

print(2 ** 3)
print(5 // 4)
print(5 % 4)

# math functions
print(round(3.1))
print(abs(-20))
# complex()

print(bin(5))
print(int('0b101', 2))

PI = 3.14
user_IQ = 190
a, b, c = 1, 2, 3

user_IQ -= 75

print(user_IQ)

# bool
name = "Ledi"
is_cool = False
is_cool = True

birth_year = input("What year were you born?")
age = 2023 - int(birth_year)
print(f"Your age is {age}")

# str
print(type("Hi hello there 24!"))

username = 'supercoder'
password = 'supersecret'
long_string = '''
WOW
O O
---
'''

print(long_string)

first_name = 'Ledi'
last_name = 'Hildawan'
full_name = first_name + ' ' + last_name

print(full_name)
print(f'Hi {full_name}')

selfish = '01234567'
print(selfish[0:8:2])  # 0246
print(selfish[1:])  # 1234567
print(selfish[:5])  # 01234
print(selfish[::2])  # 0246
print(selfish[-1])  # 7

username = input('Username:')
password = input('Passwod:')

print(f"{username}, your password is {'*' * len(password)} is {len(password)} letter long.")

# list
li = [1, 2, 3, 4, 5]
li2 = ['a', 'b', 'c']
li3 = [1, 2, 'a', True]

amazon_cart = ['notebooks', 'sunglasses']
print(amazon_cart[1])

# tuple
# set
# dict

# Classes (Custom Types)

# SuperCar

# Specialized Data Types

# None
