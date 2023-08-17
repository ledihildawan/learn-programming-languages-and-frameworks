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