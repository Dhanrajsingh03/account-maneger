🔐 React Account Manager

A lightweight authentication system built with React (v16+) that allows users to register, log in, and manage their account information. User data and session state are securely stored in the browser using localStorage.

✨ Features

🧑‍💻 User Registration & Login

🔒 Client-side Authentication

👤 Profile Management (View & Edit)

🚧 Protected Routes (Profile page requires login)

💾 Persistent Storage using localStorage

📂 Project Setup

Install dependencies:

npm install


Start the development server:

npm start


Application URL:
👉 http://localhost:3000/

📍 Core Pages
Route	Description
/register	Create a new user account
/login	Login with email & password
/profile	View and update user information (protected)
🧠 Technologies Used

React v16+

React Router

Context API (Authentication State)

LocalStorage for persistence

🚀 Future Enhancements (Optional)

JWT-based authentication

Backend integration (Node.js / Firebase)

Role-based access

Password reset via email
