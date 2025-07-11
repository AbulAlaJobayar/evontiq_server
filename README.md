# Project Name:
EventIQ Server

EventIQ Server is a scalable and secure event management backend built using the MERN stack with TypeScript. It supports user authentication, event CRUD operations, event filtering/searching, and user participation tracking.

## Project Overview


This backend system is designed for a full-featured event management application. It offers custom authentication, dynamic event operations, powerful filtering options, and efficient API design using:

- **Express.js**
- **TypeScript**
- **Mongoose (MongoDB)**
- **Zod (Validation)**
- **JWT (Authentication)**
- **bcrypt (Password Hashing)**

## Live URL
[evontIq](https://evontiq-server.vercel.app/)


## 🔐 Authentication Features

- ✅ User Registration with validation
- ✅ Secure login with hashed password (bcrypt)
- ✅ Access & Refresh tokens via JWT
- ✅ Private route protection
- ✅ Built-in error handling

## 📦 Event Management Features

- 🔨 Add, update, delete, and view events
- 🔎 Search by title
- 🗓️ Filter by:
  - Today
  - Current Week
  - Last Week
  - Current Month
  - Last Month
- 🧑‍🤝‍🧑 Join events (user can join only once)
- 📋 View My Events with update/delete options

---


## Installation

### 1. Clone the GitHub repository:
Use the `git clone` command to clone the project repository from GitHub to your local machine

### 2. Open the project in Visual Studio Code:
Use the `code` command to open the project in Visual Studio Code.

### 3. Run `npm init` in the VS Code terminal:
This initializes a new Node.js project. It will prompt you to provide information about your project.

### 4. Install npm packages: 
Use `npm install` or `npm i` to install the project dependencies listed in the package.json file.

### 5. Create an .env file:
Create a new file named `.env` in the root folder of your project.

### 6. Set environment variables in .env file:
Open the `.env` file in a text editor and set the following variables:

```plaintext
NODE_ENV=production
PORT=5000
DB_URL=mongodb+srv://name:password@cluster0.ph1akes.mongodb.net/product?retryWrites=true&w=majority
BCRYPT_SLAT_ROUND=12
JWT_ACCESS_SECRET=b66e2d3838abdf2aa40348211171ab9bf3f30b7acdbbdbafd32ea2a14fa30392
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET=db001fd3e572a55930e88086a2ee97b385d93d31b604be83fc2f8c4cee3b4e28e617600524f1423300873d72e91833f0ba617d6f6f14ede7e37d5ef95e009007
JWT_REFRESH_EXPIRES_IN=3d

`DATABASE_URL=example(mongodb+srv://name:password@cluster0.ph1akes.mongodb.net/courses?retryWrites=true&w=majority)`
## Development Workflow

Run the project in development mode:

```bash
  npm run start:dev
```
Run in Production Mode:
```bash
  npm run start:prod
```
Build Project:
```bash
  npm run build
  ```

## if need any information
contact me

- abulalajobayar@gmail.com
- jobayar.dev@gmail.com

