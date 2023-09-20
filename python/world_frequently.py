sentence = "You are great!"

def word_frequently(sentence):
  stats = {}

  for char in sentence.split():
    if char in stats:
      stats[char] += 1
    else:
      stats[char] = 1

  return stats

print(word_frequently(sentence))