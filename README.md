# E-Commerce Website

This is a beginner project that combines Rust and React to create a simple e-commerce website. The backend is powered by the Actix web server in Rust, while the frontend is built using React. The project allows users to sign up, log in, browse products, add items to the cart, update quantities, and remove items from the cart. JWT authentication is used to secure the user data.

## Features

- User Authentication (Login/Signup) using JWT.
- Browse different types of products.
- Add products to the cart.
- View, update quantities, and remove items from the cart.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Rust with Actix Web
- **Authentication**: JWT (JSON Web Tokens)
- **Package Manager**: npm (for Node.js) and Cargo (for Rust)

## Installation

### Frontend

1. Navigate to the `React_Frontend` directory:

   ```
   cd ./React_Frontend/
   ```

2. Install the required dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

   Ensure that Node.js is installed on your machine.

### Backend

1. Navigate to the `Rust_Backend` directory:

   ```
   cd ../Rust_Backend/
   ```

2. Run the backend server:

   ```
   cargo run
   ```

   Ensure that Rust is installed on your machine.

### Git Ignore Files

4. If you need a `.gitignore` file for the frontend, you can generate one [here](https://www.toptal.com/developers/gitignore/api/node,react).
5. If you need a `.gitignore` file for the backend, you can generate one [here](https://www.toptal.com/developers/gitignore/api/rust).

## Running the Project

To run the project, follow these steps:

1. **Run the Frontend**:

   - Open a terminal, navigate to the `React_Frontend` directory, and run the commands listed above.

2. **Run the Backend**:
   - Open another terminal, navigate to the `Rust_Backend` directory, and run the commands listed above.

Once both the frontend and backend servers are running, you can access the e-commerce website through your browser.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to improve the project.
