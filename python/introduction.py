# Single line comments start with a number symbol.

""" Multiline strings can be written
    using three "s, and are often used
    as documentation.
"""

####################################################
## 1. Primitive Datatypes and Operators
####################################################

# (is vs. ==) is checks if two variables refer to the same object, but == checks
# if the objects pointed to have the same values.

3
1.5

'abc'
'Hello, world'

True
False

None

1 + 1;
0.1 + 0.3;
8 - 1;
10 * 2;
35 / 5;
5 / 2;
10 % 2;
30 % 2;
18.5 % 7;
2 ** 8
1 + 3 * 2
(1 + 3) * 2

5 // 3
-5 // 3
5.0 // 3.0
-5.0 // 3.0

not True
not False
True and False
False or True
True + True
True * 8
False - 5
0 == False
2 > True
2 == True
-5 != False
1 == 1
2 == 1
1 != 1
2 != 1
1 < 10
1 > 10
2 <= 2
2 >= 2
1 < 2 and 2 < 3
2 < 3 and 3 < 2
1 < 2 < 3
2 < 3 < 2

bool(0)
bool("")
bool([])
bool({})
bool(())
bool(set())
bool(4)
bool(-6)

'Hello ' + 'world'
'a' < 'b';
'5' == 5;

'This is a string'[0]
'Hello world'[0:5]
len('Hello')

fullName = 'Ledi Hildawan'

f"{fullName} is {len(fullName)} characters long."

####################################################
## 2. Variables and Collections
####################################################

print("Hello I'm Python. Nice to meet you!")
input_string_var = input("Enter some data: ")

some_var = 5
some_var += 1
some_var *= 10

"Yey!" if 0 > 1 else "Nay!"

my_array = ['Hello', 45, True]

my_array[1]
my_array.append('World')
len(my_array)

my_array[3] = 'Hello'

some_var = my_array.pop()

my_array_0 = [32, False, 'py', '12', 56, '90']

';'.join(map(str, my_array_0))
my_array_0[1:4]
my_array_0 = my_array_0[:2] + ['wr', 'ld'] + my_array_0[6:]

my_array_0[-1]
my_array_0[:3]
my_array_0[::2]
my_array_0[::-1]

# Use any combination of these to make advanced slices
# li[start:end:step]

li2 = my_array_0[:]

del li2[2]

# li2.remove(2)
li2.insert(1, 2)
li2.index('ld')

my_array_0 + li2
my_array_0.extend(li2)

'ld' in my_array_0

# Tuples are like lists but are immutable.

tup = (1, 2, 3)
tup[0]
tup + (4, 5, 6)
tup[:2]

2 in tup

a, b, c = tup[:]
a, *b, c = (1, 2, 3, 4)
d, e, f = (4, 5, 6)

d, e =  e, f

# Dictionaries store mappings from keys to values

my_obj = { "myKey": "myValue", "my other key": 4 }
my_obj["my other key"]
my_obj["myKey"]
my_obj["myThirdKey"] = True
my_obj.get("myFourthKey")
my_obj["myFifthKey"] = 5

del my_obj["myFifthKey"]

"myKey" in my_obj

list(my_obj.keys())
list(my_obj.values())

myKey = my_obj['myKey']

empty_set = set()
some_set = {1, 1, 2, 2, 3, 4}

some_set.add(5)

other_set = {3, 4, 5, 6}

some_set & other_set
some_set | other_set
{1, 2, 3, 4} - {2, 3, 5}
{1, 2, 3, 4} ^ {2, 3, 5}
{1, 2} >= {1, 2, 3}
{1, 2} <= {1, 2, 3}

2 in some_set
10 in some_set

filled_set = some_set.copy()
filled_set is some_set

####################################################
## 3. Control Flow and Iterables
####################################################

count = 1

if count == 3:
  print("evaluated if count is 3")
elif count == 4:
  print("evaluated if count is 4")
else:
  print("evaluted if it's not either 3 or 4")

x = 0

while x < 4:
   print(x)
   x += 1

# while True:
#     print("An infinite loop!")

# while True:
#   input_val = ''

#   if input_val:
#     break;

for i in range(5):
   print("will run 5 times")

animals = ["dog", "cat", "mouse"]

for animal in animals:
    print(f"{animal} is a mamal")

for i in range(10):
    for j in range(10):
        if i == 5 and j == 5:
            print(i, j)
            break
else:
    pass

description = ''

person = {
   'fname': 'Paul',
   'lname': 'Ken',
   'age': 18,
}

for x in person:
   description += str(person[x]) + ' '

my_pets = ''
pets = ['cat', 'dog', 'hamster', 'hedgehog']

for pet in pets:
   my_pets += pet + ' '

house = {
   'size': 'small',
   'colour': 'red',
}

if house["size"] == 'big' and house["colour"] == 'blue':
   house["contains"] = 'bear'

if house['colour'] == 'red' or house['colour'] == 'blue':
   print('colour is either red or blue')

otherName = None

name = otherName or 'default'

# try:
#   raise IndexError("This is an index error")
# except IndexError as e:
#    pass
# except (TypeError, NameError):
#    pass
# else:
#    print("All good!")
# finally:
#    print("We clean up resources here")

with open('myfile.txt') as f:
   for line in f:
      print(line)