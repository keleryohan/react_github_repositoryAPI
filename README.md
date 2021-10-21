This is React project that utilizes the Github API to fetch repositories based on a text input and a selection of languages Github accepts repositories to be writen in.

To inicialize the project, install the necessary dependecies with yarn install, and then start the project with yarn start.

The list of languages can be found here: https://github.com/github/linguist/blob/master/lib/linguist/languages.yml <br/>
The language file was originally in .yml format, I converted it using an online tool to .json, and then made a fuction in Python to convert it to a .txt containing only a list of the name of the languages. Such function as well as the .txt and .json files are in the 'language_data' folder.
