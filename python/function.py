# global
# nonlocal

def laugh():
  print("**" * 20)
  print("HA!" * 20)
  print("LOL!" * 20)
  print("**" * 20)

laugh()

def highest_even(li):
  evens = []

  for item in li:
    if item % 2 == 0:
      evens.append(item)

  return max(evens)

print(highest_even([10, 1, 2, 3, 4, 5, 6, 7, 8]))