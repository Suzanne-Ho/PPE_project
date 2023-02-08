# Blogging application - ECE Webtech project

This is a blog application, where users can create articles and comment them. It's built with Next.js, Supabase and Tailwind CSS.

## Production 

- Vercel URL: https://ece-webapp-ho-varnier-ddqg.vercel.app
- Supabase project URL: https://tobjoraqqsonofcnyaxp.supabase.co

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone ...
  cd ...
  ```
* Start the the application
  ```bash
  cd app
  # Install dependencies (use yarn or npm)
  npm install
  npm run build
  npm start
  ```
* Start Supabase
  ```bash
  cd supabase
  docker compose up ...
  ```

## Authors

Emma Varnier, emma.varnier@edu.ece.fr

Suzanne Ho, suzanne.ho@edu.ece.fr

## Tasks
  
**Project management:**

* Naming convention   
  2/2 : ok
* Project structure   
  2/2 : ok
* Git   
  1/2 : use of conventional commits but use only main branch and no linter integration. No need to use rebase or merge because no conflict
* Code quality   
  2/4 : certain part of code could have been optimized and construct in a more accurent way
* Design, UX, and content   
  3/4 : Content could be improved

**Application development:**

* Home page   
  2/2 : Informative, and with a call to action, displays the last three articles.
  Header with the button to switch color and themes. Can acces all pages of the app and log in.

* Login and profile page   
  4/4 : user can sign in with gitHub or email. Persist authenticated user information are displayed on the profile page and the header. If he signed in with gitHub he can see his username on the header and if he signed in with email he see his email address. He can log out pushing the button. 
  
* New articles creation   
6/6 : User can create an article only if he is logged in. He can cancel or save his new article in database thanks to a form. 
* New comment creation   
4/4 : A form is displayed at the bottom of article pages allowing authenticated to leave a comment, the comment is then displayed.
* Resource access control   
2/6 : Only authenticated users can create articles and comments. A user only has access to the articles he created. 
* Article modification   
  4/4 : User can see the "edit" button, redirecting to the editing page to modify the article, only if he is the author of the article. He can modify the title, the content or even both, the change is effective in database.
* Article removal   
2/2 : User can see the "delete" button, only if he is the author of the article. It's deleted in the database.
* Comment modification   
2/2 : Only the author can see the "edit" button, opening an editing form to modify his/her comment. The change is effective in datab ase.We had difficulty to retrieve the comment id but we finally figured out that we could use the value of the button
* Comment removal   
2/2 : Only the author can see the "delete" button to remove his comment.the change is effective in database. Same difficulty than comment modification, same solution.
* Account settings   
4/4 : User can see his information (email, firstname, lastname) on the profile page and modify his firstname and lastname. Changes are visible instantly on the page.
* WYSIWYG integration   
0/2 
* Gravatar integration   
1/2 : Gravatar user icon is displayed in the header and in profile page
* Light/dark theme   
2/2 : User can switch between light and dark themes thanks to a button, using Tailwind CSS and it's persistent. We are using useContext to persist the theme and localStorage to set and get the theme.
* Accent color selection   
4/4 : User has a button so he can select his favorite color between some prepared themes and use it as a primary color for the app.
  We are using useContext to persist the theme and localStorage to set and get the theme.
## Bonus
No time for bonus.
