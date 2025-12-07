print("Welcome to Fantasy Quest!")

sword_demage = 10
start_health = 100
end_health = start_health - sword_demage

print(f"Sam's health is: {start_health}")
print(f"Sam's takes {sword_demage} demage...")
print(f"Sam's health is: {end_health}")

print("Greetings, adventurer!")

print("Starting up game server...")
print("local game server is listening on port 8080")

print((250 + 241 + 244 + 255) / 4)

print("Ah! Great choices...")
print("Is there anything else I can help you with?")

name = "Lopen"
level = 25
character_class = "Windrunner"
magic_resistance = float(15)
account_active = True

# Don't edit below this line

print("Character Report")
print(f"{name} is a level {level} {character_class}.")
print(f"They have {magic_resistance} magic resistance.")
print(f"Their account is currently active: {account_active}")

print("=========================")
print("Character Report Complete")
print("Data types:")
print(
    f"name: {type(name).__name__}, level: {type(level).__name__}, character_class: {type(character_class).__name__}"
)
print(f"magic_resistance: {type(magic_resistance).__name__}")
print(f"account_active: {type(account_active).__name__}")


def triple_attack(damage_one, damage_two, damage_three):
    return damage_one + damage_two + damage_three


# Don't touch below this line

# This is the first triple attack
attack_one = 2
attack_two = 4
attack_three = 3
first_triple_attack_damage = triple_attack(attack_one, attack_two, attack_three)

print("Getting damage for", attack_one, attack_two, "and", attack_three, "...")
print(first_triple_attack_damage, "points of damage dealt!")
print("=====================================")

# This is the second triple attack
attack_four = -1
attack_five = 10
attack_six = 5
second_triple_attack_damage = triple_attack(attack_four, attack_five, attack_six)

print("Getting damage for", attack_four, attack_five, "and", attack_six, "...")
print(second_triple_attack_damage, "points of damage dealt!")
print("=====================================")


## function to add your current question data to a cookie
