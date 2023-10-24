# Contact Manager Mobile App

**Overview**

This repository contains a React Native mobile app designed for contact management. It enables user registration and authentication, contact creation, editing, and deletion, and provides a user-friendly and responsive interface.

**Features**

- User Registration and Authentication
- Contact Management (Create, Update, Delete)
- List and View Contact Details
- Modal Confirmation for Deleting Contacts
- Token-Based Authentication

## Getting Started

**Prerequisites**

- [Node.js](https://nodejs.org/)

**Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/awesomegoodman/jvec-assessment-mobile.git
   ```

2. Navigate to the project directory:

   ```bash
   cd jvec-assessment-mobile/ContactManager
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

**Running the App**

After installing dependencies:

- Start the development server:

  ```bash
  npx react-native run-android
  ```

## App Screens and Navigation

**Homepage**: Displays app information.

**Signup/Login**: User registration and login.

**Create Contact**: Form to add a new contact.

**Edit Contact**: Modify contact details.

**Contacts List**: View and manage saved contacts.

**Contact Details**: Comprehensive contact information.

**Deleting Contacts**: Easily remove contacts from the list.

**User Authentication**: Redirects logged-in users to Contacts List; anonymous visitors to Homepage.

## Directory Structure

- `components`: Reusable components.
- `constants`: App constants.
- `navigation`: Screen navigation management.
- `pages`: Main screens (homepage, signup/login, create contact, edit contact, contacts list, and contact details).
- `styles`: Stylesheets for UI components.
- `__tests__`: Unit tests for various components and screens.

**Styling and UI**

The app is responsive, user-friendly, and adheres to mobile UI conventions. Styling is done using styled-components, maintaining a modular and maintainable codebase.

**App Logic and Functionality**

- Communicates with the Django backend via API endpoints.
- Implements token-based authentication.
- Provides comprehensive error handling.
- Utilizes modal confirmation for safe contact deletions.
- Ensures data security, including password hashing and rate limiting.
- Maintains proper CORS configuration for backend communication.

**Testing**

Unit tests are available to validate the app's features. Run tests using:

```bash
npm test
```
