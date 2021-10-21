import json 

#a function that converts the .json file containing the languages supported by github into a .txt with a list with only the name of said languages
with open('available_languages.json', 'r+') as f1:
  data = json.load(f1)
  f1.close()
  with open('available_languages_list.txt', 'w') as f2:
    for lang in list(data.keys()):
      f2.write(lang + "\n")
    f2.close()
  