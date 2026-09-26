# Liquid Layers

A modern, responsive e-commerce web application for browsing and purchasing resin-art products. Built with React and Vite, the application provides product discovery, authentication, cart management, wishlist functionality, address management, and a streamlined shopping experience.

## 🚀 Live Demo

**Live Website:** [Liquid Layers](https://liquid-layers.vercel.app/)

**GitHub:** [github.com/vishalydv25/liquid-layers](https://github.com/vishalydv25/liquid-layers)

---

## 📌 Features

- 🛍️ Browse resin-art products
- 🔎 Product browsing and product details
- 🔐 User authentication
  - Login
  - Signup
  - Logout
- 🛒 Shopping cart
  - Add products
  - Update quantities
  - Remove products
- ❤️ Wishlist management
- 📍 Address management
  - Add address
  - Edit address
  - Delete address
- 📦 Order-related functionality
- 🗂️ Product categories
- 📱 Responsive user interface
- 🔔 User-friendly notifications
- 💳 Razorpay checkout integration
- ⚡ Fast development and production builds using Vite

---

## 🛠️ Tech Stack

### Frontend

- **React.js**
- **React Router**
- **Vite**
- **JavaScript (ES6+)**
- **CSS**
- **Axios**

### Application & State Management

- React Context API
- React Reducers
- MirageJS

### Authentication

- JWT-based authentication flow
- bcryptjs
- Browser-compatible JWT utility

### Other Libraries & Tools

- Razorpay
- UUID
- Day.js
- React Toastify
- Mockman
- Font Awesome
- Feather Design

---

## 🏗️ Project Architecture

```text
liquid-layers/
│
├── public/
│   └── robots.txt
│
├── src/
│   ├── backend/
│   │   ├── controllers/
│   │   ├── db/
│   │   └── utils/
│   │
│   ├── Components/
│   │
│   ├── Context/
│   │   ├── Auth Context/
│   │   ├── Cart Context/
│   │   ├── Filter Context/
│   │   └── Wishlist Context/
│   │
│   ├── Pages/
│   │
│   ├── Reducer/
│   │
│   ├── Utils/
│   │
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.mjs
└── .gitignore
