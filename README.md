# Prescripto - Doctor-Patient Appointment Booking Platform

Prescripto is a premium-styled, full-stack doctor-patient appointment booking web application built using the MERN stack (MongoDB, Express, React, Node.js). It provides a seamless experience for patients to search and book appointments, doctors to manage their schedules and track earnings, and administrators to oversee the entire platform's operations.

---

## 🌟 Key Features

### 👤 Patient Portal
* **User Authentication**: Secure registration and login with JWT and Bcrypt password hashing (15-day token session).
* **Doctor Search & Filter**: Filter doctors by specific medical specialties (e.g., General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist).
* **Appointment Scheduling**: Interactive slot selection with real-time availability checking.
* **Online Payments**: Integrated with Razorpay sandbox for secure transactions, protected by HMAC-SHA256 signature verification.
* **Profile Management**: Upload profile photos (using Cloudinary storage), edit contact details, gender, date of birth, and addresses.

### 🩺 Doctor Dashboard
* **Dynamic Analytics**: Visual indicators of total earnings, total appointments, and unique patient counts.
* **Appointment Management**: Direct actions to mark an appointment as "Completed" or "Cancelled".
* **Schedule Control**: Toggle "Availability" status to open/close booking slots for patients.
* **Profile Editing**: Customize degree, experience, fees, about bio, and address details.

### 🔑 Admin Console
* **Doctor Management**: Add new doctors with photo upload, profile setup, and credential assignment.
* **Global Statistics**: Real-time overview of the total number of registered doctors, booked appointments, and active patients.
* **Superuser Controls**: Cancel appointments and monitor the latest registered bookings across the entire application.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend** | React 19, Vite, React Router DOM 7 | Responsive, client-side routing, and hot module replacement |
| **Styling** | Custom Vanilla CSS, Tailwind CSS v4 | Curated sleek color palette, modern typography (Inter), glassmorphism cards, micro-animations |
| **Backend** | Node.js (ESM), Express 5 | Modular routing, role-based middleware controllers |
| **Database** | MongoDB Atlas, Mongoose 9 | Object Data Modeling (ODM) with dynamic schema validation |
| **File Storage** | Cloudinary SDK | Cloud-based media storage for user and doctor profile pictures |
| **Payments** | Razorpay SDK | Sandbox environment processing and cryptographic signature verification |
| **State Management** | Context API (React) | Distributed contexts (`AppContext`, `AdminContext`, `DoctorContext`) |

---

## 📁 Project Structure

```
Doctor_Patient_App_for_Placement/
├── admin/                     # Admin & Doctor React Dashboard (Vite)
│   ├── src/
│   │   ├── components/        # Layout, Navbar, and Sidebar components
│   │   ├── context/           # AdminContext & DoctorContext states
│   │   ├── pages/
│   │   │   ├── Admin/         # Dashboard, AddDoctor, AllDoctors, Appointments
│   │   │   └── Doctor/        # DoctorDashboard, DoctorAppointments, DoctorProfile
│   │   └── main.jsx
│   └── vite.config.ts
├── backend/                   # Node.js + Express API
│   ├── config/                # Database (Mongoose) and Cloudinary configurations
│   ├── controllers/           # Admin, Doctor, and User controllers
│   ├── middleware/            # JWT Authorization guards (authAdmin, authDoctor, authUser, multer)
│   ├── models/                # Schema definitions (appointment, doctor, user)
│   ├── routes/                # Router definitions
│   └── server.js              # Entry point
├── frontend/                  # Patient Portal React Application (Vite)
│   ├── src/
│   │   ├── components/        # Header, Banner, SpecialityMenu, TopDoctors, Footer
│   │   ├── context/           # AppContext state (doctors list, user profile, bookings)
│   │   ├── pages/             # Home, About, Contact, Doctors, Login, MyProfile, MyAppointments, Appointment
│   │   └── main.jsx
│   └── vite.config.ts
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites
* **Node.js** (v18.x or higher)
* **MongoDB Atlas** database URI
* **Cloudinary** Account API credentials
* **Razorpay** API credentials (for payment sandbox testing)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Lovish7788/Doctor_patient.git
cd Doctor_Patient_App_for_Placement
```

### Step 2: Configure Environment Variables
Create a `.env` file inside the `backend/` directory:
```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/prescripto
JWT_SECRET=your_jwt_signing_key_here
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=adminPassword123

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Config
RAZORPAY_KEY=rzp_test_xxxxxxxxx
RAZORPAY_SECRET=xxxxxxxxxxxxxxxx

# Allowed Origin (CORS Configuration)
ADMIN_FRONTEND_URL=http://localhost:5174
```

### Step 3: Install Dependencies
Run the install command inside all three main folders:
```bash
# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install

# Install Admin dependencies
cd ../admin
npm install
```

---

## 🏃 Running the Application

To run the application locally in development mode:

1. **Start the Express API Server:**
   ```bash
   cd backend
   npm run dev
   ```
   *The server will run at:* `http://localhost:4000`

2. **Start the Patient Client Application:**
   ```bash
   cd frontend
   npm run dev
   ```
   *The client UI will run at:* `http://localhost:5173`

3. **Start the Admin & Doctor Dashboard:**
   ```bash
   cd admin
   npm run dev
   ```
   *The dashboard UI will run at:* `http://localhost:5174`

---

## 🔒 Security & Best Practices
* **JWT Expiry**: User login sessions expire after 15 days (`{ expiresIn: '15d' }`) to preserve account integrity.
* **Secure Payment Verification**: Payment validity is cryptographically validated using `crypto.createHmac('sha256')` preventing spoofing of completed orders.
* **CORS Restrictions**: Express middleware restricts API access strictly to the configured frontend client and admin dashboard origins.
* **Data Sanitization**: Mongoose schemas use `{ minimize: false }` to securely store empty/uninitialized slot objects, avoiding data distortion during MongoDB persistence operations.
* **Safe Mongoose Queries**: All database queries are rigorously awaited and wrapped with error-catching mechanisms, preventing crashes during user profile loads, bookings, or cancellations.

---

## 📄 License
This project is licensed under the **MIT License**.
