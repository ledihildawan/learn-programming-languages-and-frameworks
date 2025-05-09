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

contents = {"aa": 12, "bb": 21,}

import json

with open("myfile1.txt", "w+") as file:
  file.write(json.dumps(contents))

with open('myfile1.txt', "r+") as file:
  contents = json.load(file)

our_iterable = contents.keys()

for i in our_iterable:
   print(i)

our_iterable = iter(our_iterable)

next(our_iterable)

our_iterator_2 = iter(our_iterable)

for i in our_iterator_2:
    print(i)

grade = 'B'

if grade == 'A':
   print("Great job")
elif grade == 'B':
   print("OK job")
elif grade == 'C':
   print("You can do better")
else:
   print("Oy vey")

####################################################
## 4. Functions
####################################################

def myFunction(thing):
   return thing.upper()

print(myFunction("foo"))

from threading import Timer

def sayHelloInFiveSeconds(name):
   prompt = f"Hello, {name}!"

   def inner():
      print(prompt)

   Timer(5, inner).start()

sayHelloInFiveSeconds("Ledi")

isEven = lambda number : number % 2 == 0

isEven(7)

def add(x, y):
   print(f"x is {x} and y is {y}")
   return x + y

add(5, 6)

def varargs(*args):
   return args

varargs(1, 2, 3)

def keyword_args(**kwargs):
   return kwargs

keyword_args(big="foot", loch="ness")

def all_the_args(*args, **kwargs):
   print(args)
   print(kwargs)

args = (1, 2, 3, 4)
kwargs = {"a": 3, "b": 4}

all_the_args(*args)
all_the_args(**kwargs)
all_the_args(*args, **kwargs)

def swap(x, y):
   return [y, x]

xx = 10
y = 2

[xx, y] = swap(x, y)

# Global scope
xxx = 5

def set_xxx(num):
   # Local scope
   xxx = num
   print(xxx)

def set_global_xxx(num):
   global xxx
   print(xxx)
   xxx = num
   print(xxx)

set_xxx(43)
set_global_xxx(6)

# Python has first class function

def create_adder(x):
   def adder(y):
      return x + y

   return adder

add_10 = create_adder(10)

add_10(3)

# There are also anonymous functions

(lambda x: x > 2)(3)
(lambda x, y: x ** 2 + y ** 2)(2, 1)

list(map(add_10, [1, 2, 3]))
list(map(max, [1, 2, 3], [4, 6, -1]))
list(filter(lambda x: x > 5, [3, 4, 5, 6, 7]))

{x for x in 'abcddeef' if x not in 'abc'}
{x: x**2 for x in range(5)}

####################################################
## 5. Modules
####################################################

import math

print(math.sqrt(16))

from math import ceil, floor

print(ceil(3.7))
print(floor(3.7))

import math as m

m.sqrt(16) == m.sqrt(16)

####################################################
## 6. Classes
####################################################

class Human:
   species = "H. sapiens"

   def __init__(self, name):
      self.name = name
      self._age = 0

   def say(self, msg):
      print(f"{self.name}: {msg}")

   def sing(self):
      return "yo... yo... microphone check... one two... one two..."

   @classmethod
   def get_species(cls):
      return cls.species

   @staticmethod
   def grunt():
      return "*grunt*"

   @property
   def age(self):
      return self._age

   @age.setter
   def age(self, age):
      self._age = age

   @age.deleter
   def age(self):
      del self._age


class Superhero(Human):
   species = 'Superhuman'

   def __init__(self, name, movie = False, superpowers=["super strength", "bulletproofing"]):
      super().__init__(name)

      self.fictional = True
      self.movie = movie
      self.superpowers = superpowers

   def sing(self):
      return 'Dun, dun, DUN!'

   def boast(self):
        for power in self.superpowers:
            print("I wield the power of {pow}!".format(pow=power))

class Bat:
   species = 'Baty'

   def __init__(self, can_fly = True):
      self.fly = can_fly

   def say(self, msg = '... ... ...'):
      return msg

   def sonar(self):
      return '))) ... ((('

class Batman(Superhero, Bat):
   def __init__(self, *arg, **kwargs):
      Superhero.__init__(self, 'anonymous', movie = True, superpowers = ['Wealthy'], *args, **kwargs)
      Bat.__init__(self, *args, can_fly = False, **kwargs)

      self.name = 'Ben Afflect'

   def sing(self):
      return 'nan nan nan nan nan batman!'

####################################################
## 7. Advanced
####################################################

# Generators?

# Decorators are a form of syntactic sugar.

from functools import wraps

def log_function(func):
   @wraps(func)
   def wrapper(*args, **kwargs):
      print("Entering function", func.__name__)
      result = func(*args, **kwargs)
      print("Exiting function", func.__name__)

      return result

   return wrapper

@log_function
def my_function(x,y):
   return x+y

my_function(1,2)