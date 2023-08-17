q = "What year were you born in? "
year = input()

if year.isnumeric():
  year = input(f"That isn't a number. Try again please! {q}")

year = int(year)

print(f"You were born {2023 - year} years ago")