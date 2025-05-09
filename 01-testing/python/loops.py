import random

roll1 = random.randint(1, 6)
roll2 = random.randint(1, 6)

while roll1 != 1 or roll2 != 1:
  print(roll1, roll2)
  roll1 = random.randint(1, 6)
  roll2 = random.randint(1, 6)

print(roll1, roll2)
print("YAY SNAKE EYES!!!")

for char in "Tacos":
  print(char)


for num in range(-10, 10):
  print(num)

for num in range(10):
  print("HELLO WORLD!")

for num in range(0, 100, 2):
  print(num)

for num in range(10, 1, -1):
  print(num)

for item in [1, 2, 3, 4, 5]:
  for x in ['a', 'b', 'c']:
    print(item, x)

# Iterable - list, directory, tuple, set, string

picture = [
  [1, 1, 1, 1],
  [0, 1, 1, 0]
]

for row in picture:
  for pixel in row:
    if (pixel == 1):
      print('*', end = '')
    else:
      print(' ', end = '')
  print('')

some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']
duplicates = []

for item in some_list:
  if some_list.count(item) > 1:
    if item not in duplicates:
      duplicates.append(item)

print(duplicates)