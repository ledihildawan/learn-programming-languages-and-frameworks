first_name =input('Enter your first name: ')
last_name = input('Enter your last name: ')
name_length = len(first_name) + len(last_name)

if name_length == 12:
  print(f"{first_name} {last_name} is exactly the average length of American names")
elif name_length< 12:
  print(f"{first_name} {last_name} is shorter than the average length of American names")
else:
  print(f"{first_name} {last_name} is longer than the average length of American names")

is_old = True
is_license = True

if is_old and is_license:
  print('You are old enough to drive, and you have a license!')
else:
  print('You are not of age!')

is_friend = False
can_message = 'message allowed' if is_friend else 'not allowed to message'

is_magician = False
is_expert = True

if is_expert and is_magician:
  print('You are a master magician')
elif is_magician and not is_expert:
  print('At least you are getting there')
else:
  print('You need magic powers')