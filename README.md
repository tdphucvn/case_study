# Awesome Notepad Application

This application was built as small case study. The project was built using ReactJs and Material UI. Backend is handled with Express.js and data are stored with the help of MongoDB.

## Used Technologies

- HTML
- CSS / Material UI
- TypeScript
- React
- Node.js (Express.js)
- MongoDB

## Given Problem

The task was to create a simple notepad with features such as create, edit or delete a note. Additionaly the application has a simple text editor for notes and athentication layer to provide a client with his own notes.

## Application Design

For this project I have decided to use a JavaScript strict superset Typescript. Both for frontend and backend. Website was build as a MERN stack application (React for frontend, non-relational database MongoDB, Node.js and its framework Express.js for backend).

For communication between frontend and backend I have used axios library.

The application is then built as a REST API.

## Approach to the Problem

### Authentication

Signing in and signing up have very common features such as checking if the username/email is already used (this is done with the built-in MongoDB functions) or whether the password and the confirmation password are matching.

The question was how to keep track of authenticated users and admins. I have chosen the method that is using jsonwebtokens (JWT Tokens). However, I have decided to take a little bit different approach that most would. I'm storing authenticated state in redux store and also accessToken is kept there as a variable. The only exception is refreshToken that is located in HTTPOnly cookies.

With this approach whenever a user is accessing private route he is by default sending a request with a header containing accessToken. If the accessToken is invalid, either it has expired or there is some other problem with it, the backend will reach for a refreshToken in cookies a tries to validate it. If it is valid the server send back to the client a new accessToken which will be stored in redux store and update the current refreshToken in cookies. In the opposite case the authenticated state will be set to false and the refreshToken will be destroyed.

### Private and Restricted Routes

Private Routes. These routes are supposed to be accessed by all users that are authenticated. In the application I have used them when accessing client's notes. The way it works is that the page loads the global authenticated state that is kept in redux store. If the user is authenticated the route will let them through, on the other hand the client will be redirected to the login page.

Restricted Routes. These ones are quite the opposite to the private routes. The user can access them only if they are not authenticated, in this case I have used them to prevent a client to for instance login twice. The way it works is the same as the Private Routes.

### Redux Store

The application is using Redux (redux toolkit) to store authentication, notes and current mode data. In order to prevent loosing data on every page load I am using redux-presist to store the data in the localStorage.

The great thing about redux is that since I'm storing all the notes there I don't have to make an API call to get the notes every single time. All I need is to call the API in the beginning and then whenever I need this data I will just pull it out of the redux store. Also searching is much faster since all the data is already loaded and stored.

### Text editor

In order to format text the text editor is using document.execCommand()([more](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)). When the client saves the note the application extracts 3 variables - content, preview and title. Title is the first 20 characters, it is than display on the side panel. Preview is the unformated raw text of the note. Content is the HTML of the note, this is displayed once the client opens the note.

### Responsive Website

Application is fully responsive on mobile devices.

## Projects

- [Live Demo](https://casestudynotepad.herokuapp.com/)
