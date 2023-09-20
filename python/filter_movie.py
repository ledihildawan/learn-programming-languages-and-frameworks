movies = [["Interstellar", 10], ["Santiago Munes", 5]]

def filter_movie(movies, max_rating = 10):
  filtered_movies = []

  for movie in movies:
    if (movie[1] == max_rating):
      filtered_movies.append(movie[0])

  return filtered_movies

print(filter_movie(movies, 5))