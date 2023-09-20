import random

data = ['a', 'b', 'c']
cols = 12

for col in range(cols):
  r = random.choice(data)
  print(f"message {r}")