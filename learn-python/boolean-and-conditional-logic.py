# Conditional statements
# Conditional logic using if statemenets represents different paths a program can take based type of comparison of input
# Conditional Checks
# Truthiness all conditional checks resolve to True or False.
# Comparison Operators: ==, !=, >, <, >=, <=
# Logical Operators: and, or, not

# Double equals is checking the values to see if they're the same.
# is checking to see if they're stored in the same place in memory.

age = input("How old are you?")
age = int(age)

if age != "":
    if age >= 18 and age < 21:
        print("You can enter, but need a wristband!")
    elif age >= 22:
        print("You are good to enter and can drink")
    else:
        print("You cant't come in, little one! :(")
else:
    print("Please enter an age!")