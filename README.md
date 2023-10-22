# Contact Manager Mobile App

**Overview**

This project is a Contact Manager Mobile App built with React Native, designed to complement the Contact Manager backend API created with Django. The app allows users to register, log in, manage their contacts, and perform various operations like creating, updating, viewing, and deleting contacts.

**Features**

- User Registration and Authentication
- Create, Update, and Delete Contacts
- List and View Contact Details
- User-Friendly and Responsive User Interface
- Modal Confirmation for Deleting Contacts
- Token-Based Authentication

**Installation**

Before running the mobile app, make sure you have Node.js and npm installed on your system. Also, ensure you have cloned the ['jvec-assessment-mobile' repository](https://github.com/awesomegoodman/jvec-assessment-mobile). Navigate to the project folder and follow these steps:

1. Install project dependencies by running the following command in the project root:

   ```
   npm install
   ```

2. Ensure you have an Android emulator or device connected to your development environment.

3. Start the React Native app using the following command:

   ```
   npx react-native run-android
   ```

   This command will build and run the app on your Android device or emulator.

**Screens and Navigation**

The app is divided into several screens and supports seamless navigation:

- **Homepage**: Displays useful information about the mobile app.
- **Signup/Login**: Allows users to either sign up or log in.
- **Create Contact**: Contains a form for adding a new contact.
- **Edit Contact**: Lets users update contact information.
- **Contacts List**: Lists all saved contacts and offers options to view, edit, or delete them.
- **Contact Details**: Shows comprehensive details of a contact, with options to edit or delete.
- **Deleting Contacts**: You can delete contacts from the Contacts List or the Contact Details page.
- **User Authentication**: Logged-in users are directed to the Contacts List, while anonymous visitors are redirected to the Homepage.

**Styling and UI**

The app has a clean and user-friendly design. It is highly responsive and follows standard mobile app UI conventions. Styling is achieved using styled-components to maintain a modular and maintainable codebase, adhering to best practices. Inline styles have been avoided.

**App Logic and Functionality**

- The mobile app communicates with the Django backend through API endpoints for user registration, login, contact management, and more.
- Token-based authentication is implemented to secure user actions.
- Comprehensive error handling is in place to provide informative responses.
- A modal confirmation dialog is used for deleting contacts to prevent accidental deletions.
- Security features, such as password hashing and rate limiting, are carried over from the backend.
- CORS policies are configured to ensure proper communication with the backend.

**Contributing and Testing**

Unit tests are available to validate the app's features. You can run these tests with the following command:

```
npm test
```
