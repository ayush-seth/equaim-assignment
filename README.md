## Introduction

This is a guide on how to set up and run the Equaim Assignment app. It is built with TypeScript, zod, Vite, Mantine, and Express.js. The application includes a frontend built with React and a backend server.

## Technologies Used

Equaim was built using the following technologies:

- [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript that allows for type safety and better code organization.
- [Zod](https://zod.dev/): A library for schema validation that helps ensure data consistency throughout the application.
- [Vite](https://vitejs.dev/): A fast and lightweight build tool that enables rapid development and hot module replacement.
- [@mantine/core](https://mantine.dev/): A UI library that provides a wide range of customizable components, including buttons, forms, and modals.
- [@mantine/forms](https://mantine.dev/form/use-form/): A library that simplifies the handling of forms by managing form state and providing validation functions.
- [Express.js](https://expressjs.com/): A fast and flexible web application framework for Node.js that provides robust routing, middleware, and error handling.
- [Axios](https://axios-http.com/): A promise-based HTTP client that allows us to make API requests from our frontend application.
- [ESLint](https://eslint.org/): A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

## Installation and Setup

To run the Equaim application, follow these steps:

1. Install pnpm by running the following command in your terminal:

```bash
npm install -g pnpm
```

2. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/ayush-seth/equaim-assignment.git
cd equaim
```

3. Install dependencies for both the server and frontend:

```bash
cd equaim-server
pnpm install
cd ../equaim-frontend
pnpm install
```

4. Run the backend server:

```bash
cd equaim-server
pnpm dev
```

5. Run the frontend:

```bash
cd equaim-frontend
pnpm dev
```

Once the server and frontend are running, you can access the application by navigating to `http://localhost:5173` in your web browser.
