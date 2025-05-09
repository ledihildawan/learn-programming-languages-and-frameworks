from random import randint

rock = """
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
"""
paper = """
     _______
---'    ____)____
           ______)
          _______)
         _______)
---.__________)
"""
scissors = """
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
"""

num = randint(1, 3);

if num == 1:
  comp_move = "rock"
elif num == 2:
  comp_move = "paper"
elif num == 3:
  comp_move = "scissors"

player_move = input("Enter your move (rock, paper, scissors): ").lower()

print("YOUR MOVE: ")
if player_move == 'rock':
  print(rock)
elif player_move == 'paper':
  print(paper)
elif player_move == 'scissors':
  print(scissors)

print("COMPUTER MOVE: ")
if comp_move == 'rock':
  print(rock)
elif comp_move == 'paper':
  print(paper)
elif comp_move == 'scissors':
  print(scissors)

if comp_move == player_move:
  print("IT'S TIE!")
elif player_move == "rock" and comp_move == "scissors":
  print("YOU WIN!!!")
elif player_move == "paper" and comp_move == "rock":
  print("YOU WIN!!!")
elif player_move == "scissors" and comp_move == "paper":
  print("YOU WIN!!!")
else:
  print("YOU LOSE!!!")