# Story-Generator

# Summary

An application that creates stories using the text-davinci-002 engine provided by OpenAI.
Users can specify "title," "keywords," and "genre," and the narrative is automatically generated based on them.
It also has a function to generate images based on those keywords, which can be used as cover images for stories created by the user.
The created stories are uploaded to MongoDB, and users can read stories created by others.

# Function

Show all of stories
Consider whether to automatically generate backgrounds
Login/Logout/Register
Generate story from title, keyword, genre.
Generat image.
Create a detail screen

- Undecided
  Avatar can be selected when logging in
  Add Comment

# Data

Story has the following information
ID
Author
Main text
Title
Keyword
Genre
Creation date

User has the following information
ID
Name
E-mail address
Password

Comment has the following information
ID
Author
