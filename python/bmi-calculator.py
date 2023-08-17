height = float(input("What is your height (in inches): "))
wight = float(input("What is your wight (in lbs): "))

bmi = wight *703/ height ** 2
bmi =round(bmi, 1)

if bmi < 16:
  category ="Severely Underweight"
elif bmi < 18.4:
  category = "Underweight"
elif bmi < 24.9:
  category="Normal"
elif bmi < 29.9:
  category = "Overweight"
elif bmi < 34.9:
  category ="Moderalety Obese"
elif bmi < 39.9:
  category = "Severely Obese"
else:
  category = "Morbidly Obese"

print(f"Your BMI of {bmi} makes you {category}")
