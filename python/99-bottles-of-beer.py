for num_of_bottle in range(99, 0, -1):
  if num_of_bottle == 1:
    print(f"""
    {num_of_bottle} bottles of beer on the wall.
    {num_of_bottle} bottles of bear.
    Take one down, pass it around, no more bottles of bear on the wall
    """)
  else:
    print(f"""
    {num_of_bottle} bottles of beer on the wall.
    {num_of_bottle} bottles of bear.
    Take one down, pass it around, {num_of_bottle - 1} bottles of bear on the wall
    """)