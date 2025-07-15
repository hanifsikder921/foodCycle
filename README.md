
# 🌱 FoodCycle - A Local Food Waste Reduction Platform

**Live Site:** [https://foodcycle-cc2df.web.app/](https://foodcycle-cc2df.web.app/)  
**Admin Login:**  
- **Username (Email):** admin@gmail.com 
- **Password:** 123!He23

FoodCycle is a full-stack MERN-based donation management platform that connects **Restaurants**, **Charities**, and **General Users** to reduce food waste and feed communities in need. The platform offers seamless donation, request, and approval workflows with real-time role-based dashboards.

---

## ✨ Key Features

1. 🔐 **Role-based Authentication & Authorization**
   - Supports 4 distinct roles: `User`, `Restaurant`, `Charity`, and `Admin` using Firebase Authentication and JWT.

2. 📦 **Donation Management**
   - Restaurants can create, update, and manage food donation listings including quantity, pickup time, and status.

3. 📝 **Donation Requests**
   - Charities can view available donations and submit detailed requests with proposed pickup time and description.

4. ✅ **Admin Panel**
   - Admin can manage all users, approve role change requests, and feature verified donations for homepage visibility.

5. 💳 **Stripe Payment Integration**
   - Charities can securely make payments for selected services or premium features using Stripe Checkout.

6. 📊 **Real-time Dashboards**
   - Each role sees a customized dashboard with statistics, recent actions, and relevant control panels.


8. 🔍 **Search, Filter & Sort Donations**
   - Users can easily browse donations using filters by location, status, and sort by quantity or pickup time.

9. 📅 **Pickup Time Validator**
   - Requests must propose pickup time within ±2 hours of the restaurant's specified time.

10. 🌐 **Fully Responsive Design**
    - Optimized for mobile, tablet, and desktop screens.

---

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS, DaisyUI, Axios, React Router, Framer Motion  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT  
- **Authentication:** Firebase  
- **Payment:** Stripe  
- **Deployment:** Vercel (Client), Render (Server), Firebase Hosting

---

## 🚀 Getting Started (Local Setup)

1. Clone the project:
   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-hanifsikder921.git
   cd FoodCycle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup `.env` file in root:
   ```env
   VITE_API_URL=https://your-api-url.com
   VITE_FIREBASE_API_KEY=your-firebase-key
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```
/src
  /components     → Reusable UI components
  /pages          → Page-level components for routes
  /hooks          → Custom React hooks (e.g., useAuth, useAxiosSecure)
  /routes         → Protected & Public route handling
  /context        → Global context providers
```

---
**Admin Login:**  
- **Username (Email):** admin@gmail.com 
- **Password:** 123!He23


**Charity Login:**  
- **Username (Email):** foodbridge.foundation@gmail.com
- **Password:** 123!He23


**Restaurent Login:**  
- **Username (Email):** spiceheaven@gmail.com
- **Password:** 123!He23

**User Login:**  
- **Username (Email):** nusratjahan.bd@gmail.com
- **Password:** 123!He23

## 🙌 Contributions

Pull requests are welcome! If you have suggestions or feature requests, feel free to open an issue.

---

## 📄 License

MIT © 2025 [Hanif Sikder](https://github.com/hanif-sikder)
