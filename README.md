A full-stack, responsive Employee Management Dashboard built with the PERN/MERN stack paradigm (React, Node.js, Express, MySQL). This project demonstrates a complete implementation of CRUD operations, RESTful API design, and a pixel-perfect UI translated directly from Figma using *Pure CSS*.

## ✨ Key Features

* *Full CRUD Operations:* Add, view, edit, and delete employee records in real-time.
* *File Uploading:* Integrated image uploading for employee avatars using multer, with static file serving from the backend.
* *MVC Architecture:* The Node.js backend strictly follows the Model-View-Controller pattern, separating routing logic from database controllers for clean, maintainable code.
* *Pure CSS & Semantic UI:* Built without relying on utility frameworks like Tailwind or Bootstrap, demonstrating strong fundamental knowledge of CSS variables, Flexbox, CSS Grid, and responsive media queries.
* *Form Validation:* Native HTML5 and React state validation ensuring data integrity before database insertion.
* *Responsive Design:* Fully optimized for desktop, tablet, and mobile viewing with a collapsible slide-out sidebar and horizontal table scrolling.

## 🛠️ Tech Stack

*Frontend*
* React 18 (Initialized with Vite for optimized build times)
* Pure CSS (Custom variables, responsive layouts)
* Lucide React (Iconography)
* Sonner (Toast notifications)
* Axios (HTTP Client)

*Backend*
* Node.js & Express.js
* MySQL2 (Relational Database)
* Multer (Multipart/form-data middleware for image uploads)
* Dotenv (Environment variable management)
* Cors (Cross-Origin Resource Sharing)

---

## 🚀 Local Installation & Setup

### Prerequisites
Ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/en/) (v16 or higher)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) (or a local environment like XAMPP)

### 1. Database Configuration
1. Open your MySQL tool and create a new, empty database (e.g., rs_tech_db).
2. Note: You do not need to manually create the tables. The backend application is configured to automatically generate the employees schema upon its first successful connection.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend

 * Install dependencies:
   npm install

 * Create a .env file in the root of the backend directory with your database credentials:
   PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=rs_tech_db
DB_PORT=3306

 * Start the Node server:
   node server.js

   (Wait for the console to log "MySQL Connected Successfully" and "Employees table ready")
3. Frontend Setup
 * Open a new terminal instance and navigate to the frontend directory:
   cd frontend

 * Install dependencies:
   npm install

 * Start the Vite development server:
   npm run dev

 * Open your browser and navigate to http://localhost:5173.
