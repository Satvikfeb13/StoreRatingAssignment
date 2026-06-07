# 🌟 Store Rating Application

A comprehensive, full-stack web application designed to connect users with their favorite stores. It features a robust role-based architecture allowing Admins to oversee the system, Users to browse and rate stores, and Store Owners to track their performance metrics.

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT-Based Authentication**: Secure login and signup flows with encrypted token storage.
- **Role-Based Protected Routes**: Restricts unauthorized access ensuring users only see what they are supposed to.
- **Premium Authentication UI**: Modern, beautifully designed split-screen login and password recovery pages featuring fluid animations and gradient aesthetics.
- **Update Password**: Dedicated interface for users to update their credentials securely.

### 👑 Admin Dashboard (`ADMIN`)
- **System Statistics**: High-level overview of total users, stores, and submitted ratings.
- **User Management**: Add new users (Assigning Admin, User, or Owner roles) and view all users in a searchable, sortable, and filterable data table.
- **Store Management**: Add new stores and assign them to specific store owners. Includes a searchable data table to track all stores in the platform.

### 👤 User Dashboard (`USER`)
- **Store Browsing**: View all available stores with a fast, responsive search filtering by Store Name or Address.
- **Rating System**: Submit a 1 to 5 star rating for any store, or update previously submitted ratings via a sleek modal interface.

### 🏪 Store Owner Dashboard (`STORE_OWNER`)
- **Performance Analytics**: View your specific store's overall average rating out of 5 stars.
- **Feedback Tracking**: See a detailed table of every user who has rated your store, including their name, email, and exact rating.

### 🧪 UI Testing Fallback (Mock Mode)
- **Zero-Backend Testing**: If the backend is turned off or the database is completely empty, the application will automatically intercept API calls and populate the UI with highly realistic **Mock Data**. You can seamlessly test the UI, data tables, and dashboards without running a server!
- **Mock Login Bypass**: Test dashboards instantly by entering `admin` or `owner` in the login email field to bypass authentication if the server is offline.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Bootstrapped with Vite for lightning-fast HMR)
- **React Router DOM** (For seamless SPA navigation)
- **Axios** (With automated JWT Request Interceptors)
- **Ant Design (antd)** (For enterprise-grade UI components, tables, and forms)
- **Vanilla CSS** (For custom premium styling and layout management)

### Backend
- **RESTful API Architecture**
- **JWT (JSON Web Tokens)** for stateless authentication
- *(Ensure your backend server is running on `http://localhost:5000/api` to integrate with the frontend)*

---

## 🚀 How to Run the Program

### 1. Start the Backend Server
1. Open a terminal and navigate to your backend directory:
   ```bash
   cd backend
   ```
2. Ensure your `.env` variables (Database URL, JWT Secret, Port) are correctly configured.
3. Install dependencies and start the server:
   ```bash
   npm install
   npm start
   # The backend should now be running on http://localhost:5000
   ```

### 2. Start the Frontend Development Server
1. Open a **new** terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary React dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to: **`http://localhost:5173`**

### 3. Testing the Application (With or Without Backend)
- **Login as Admin**: `admin@test.com` (Password: `Password@123`)
- **Login as User**: `user@test.com` (Password: `Password@123`)
- **Login as Owner**: `owner@test.com` (Password: `Password@123`)

*Note: If the backend is not running, typing `admin` or `owner` in the email field will still log you in using the built-in UI Mock Mode!*

---

## 📂 Project Structure

```text
store-rating-app/
├── backend/                  # Your existing backend code
└── frontend/                 # React Application
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── api/
        │   └── axios.js      # Global Axios instance with interceptors
        ├── components/       # Reusable UI components (Tables, Modals, Navbar)
        ├── pages/            # Role-specific Dashboards and Auth Pages
        ├── services/         # API Service layer (auth, admin, store, owner)
        ├── mockData.js       # Fallback mock data for UI testing
        ├── premium.css       # Custom styling for authentication pages
        ├── index.css         # Global application styles
        ├── App.jsx           # Application Router and Route Guards
        └── main.jsx          # React Entry Point
```
