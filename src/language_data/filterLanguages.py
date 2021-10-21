import json 

with open('available_languages.json', 'r+') as f1:
  data = json.load(f1)
  f1.close()
  with open('available_languages_list.txt', 'w') as f2:
    for lang in list(data.keys()):
      f2.write(lang + "\n")
    f2.close()
  