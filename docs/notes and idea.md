- manage overlapping discs
- set up password reset 
- implement an all disc/API flightchart (similar to Marshall st)
- make flightchart hover text resposive to size of page
- make color (in input) a picker
- validate plastic type based on brand
- https://blog.logrocket.com/using-helmet-node-js-secure-application/
- add create new category button on input page
- create api backup from the discitAPI
- hitting enter on the lookup mold form is submitting the form

File structure 05/11

- discsDB
    - docs
        - Node Modules
        - Public
            -IMG
            - js files and CSS
        - Views
            -all my html except the main.handlebars
            -Layouts
                - main.handlebars
        - app.js
        - package.json
        - package-lock.son
    - SQL
        - all my sql files
    -read me


To implement user accounts with a logged in/logged out state and the ability to build a unique table, you'll need to follow several steps. Here's an outline of the process using HTML, JavaScript, and Node.js:

<!-- 1. Set up your HTML pages:
   - Create an HTML page for user registration, login, and the user dashboard.
   - Include form elements for inputting user credentials (e.g., email, password) in the registration and login pages. -->

<!-- 2. Create a database schema:
   - Define the necessary tables in your database to store user information.
   - Consider including tables for users and their unique tables, along with any additional fields you require. -->

<!-- 3. Implement user registration:
   - Handle form submission in your Node.js app by creating a route for user registration.
   - Retrieve the submitted form data, validate it, and store it in the database using Sequelize or your preferred ORM (Object-Relational Mapping) library.
   - Hash the user's password for security before storing it in the database. -->

<!-- 4. Implement user login:
   - Create a route for handling user login form submission.
   - Retrieve the submitted form data and verify it against the stored user credentials in the database.
   - If the credentials match, create a session or token to track the user's logged-in state. -->

<!-- 5. Set up session management:
   - Use a session management library like `express-session` to manage user sessions.
   - Configure the session middleware in your Node.js app to handle session data storage and retrieval.
   - Store session information, such as the user ID, in the session object. -->

6. Create user dashboard:
   - Once a user is logged in, display their unique dashboard page.
   - Design the dashboard interface where users can build their unique tables.
   - Use JavaScript and DOM manipulation to dynamically update the page based on user actions.

<!-- 7. Implement table creation:
   - Create routes in your Node.js app to handle table creation requests from the user dashboard.
   - Retrieve the necessary data from the request, validate it, and store it in the database.
   - Use Sequelize or your ORM library to create a new entry in the user's table. -->

<!-- 8. Implement logout functionality:
   - Create a route for user logout.
   - Clear the user's session or token to mark them as logged out.
   - Redirect them to a designated page, such as the login page or homepage. -->

Remember to secure your authentication and session management implementation by using best practices such as password hashing, storing sensitive information securely, and protecting against common security vulnerabilities.

This outline should provide you with a starting point to implement user accounts with unique table creation in your website using HTML, JavaScript, and Node.js.

As a best practice, it is not recommended to store and retrieve passwords in plaintext format, even for administrative purposes. Storing passwords as hashes helps to enhance security by protecting user passwords in case of a data breach. Instead of retrieving and displaying the actual password, you can provide a password reset functionality to allow users to reset their password if they forget it.

Here's a common approach to implementing a password reset functionality:

1. Provide a "Forgot Password" link or option on the login page.
2. When the user clicks on the "Forgot Password" link, prompt them to enter their email address.
3. Validate the email address and generate a unique password reset token associated with the user's account. Store this token in the user's record in the database.
4. Send an email to the user's email address containing a link with the password reset token. The link should point to a password reset page on your application.
5. When the user clicks on the password reset link, verify the token and allow the user to enter a new password.
6. Hash the new password and update the user's password in the database.
7. Notify the user that their password has been successfully reset.

This approach ensures that the actual password remains secure and not exposed, even to administrators.