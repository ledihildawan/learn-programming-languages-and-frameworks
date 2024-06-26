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

birth_year = input("What year were you born?")
age = 2023 - int(birth_year)
print(f"Your age is {age}")

# bool
name = "Ledi"
is_cool = False
is_cool = True

print(bool("Ledi"))
print(ord('1'))
print("e" in name)

# str
print(type("Hi hello there 24!"))

username = 'supercoder'.replace('supercoder', 'superadmin')
password = '                             supersecret            '.strip(' ')
long_string = '''
WOW
O O
---
'''

print(long_string)

first_name = 'Ledi'
last_name = 'Hildawan'
full_name = first_name + ' ' + last_name
indexOfH = last_name.find('H')

print(full_name)
print(full_name.lower())
print(full_name.upper())
print(full_name.capitalize())
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

amazon_cart = ['notebooks', 'sunglasses', 'toys', 'grapes']
print(amazon_cart[1])
print(amazon_cart[0::2])
new_cart = amazon_cart[:]
new_cart[0] = 'gum'
print(new_cart)

matrix = [
    [1, 0, 1],
    [0, 1, 0],
    [0, 1, 1],
]

print(matrix[0][1])
print(len(amazon_cart))
amazon_cart.append('disc');
amazon_cart.insert(2, 'jeans')
amazon_cart.extend(['axe', 'table'])
amazon_cart.pop(2)
amazon_cart.remove('axe')
amazon_cart.clear()

print(li.index(2))
print(li in [2])
print(2 in li)
print('i' in 'My name is X')
print(li.count(2))
print(sorted(li))
print(list(range(101)))

a, *other = li;
print(li)

# tuple
# set
# dict
directory = {
    'a': [1, 2, 3],
    'b': 'hello',
    'x': True
}

my_list = [
    {
        'a': [1, 2, 3],
        'b': 'hello',
        'x': True
    },
    {
        'a': [1, 2, 3],
        'b': 'hello',
        'x': True
    },
]

print(directory['b'])
print(directory.get('c', 22))
print('x' in directory)
print(True in directory.values())
print('b' in directory.keys())

directory2 = directory.copy()

print(directory.items())
directory.clear()
print(directory)
print(directory2.pop('x'))
directory2.update({ 'x': 'test '})
# Classes (Custom Types)

# SuperCar

# Specialized Data Types

# None
