# ✈️ Local Guide Platform – Frontend

This is the frontend client for **LocalGuide**, a modern travel booking platform designed to connect tourists with expert local guides. Built with Next.js 16 and TypeScript, it features a responsive UI, secure authentication, real-time booking management, and Stripe payment integration.

## 🌟 Features

* **User Experience (UX)**:
    * **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
    * **Dynamic Search & Filtering**: Filter tours by category, price, and location.
    * **Interactive UI**: Smooth transitions, loading states, and toast notifications.
* **Authentication & Roles**:
    * Secure Login & Registration (Tourist & Guide roles).
    * **Protected Routes**: Middleware to restrict access based on user roles (Admin/Guide/Tourist).
* **Booking & Payments**:
    * **Seamless Booking Flow**: Select dates, guest counts, and view pricing instantly.
    * **Stripe Integration**: Secure credit card processing with custom payment forms.
    * **Invoicing**: Auto-generated, printable invoices for confirmed bookings.
* **Dashboards**:
    * **Tourist Dashboard**: View booking history, payment status, and leave reviews.
    * **Guide Dashboard**: Manage created tours and view incoming bookings.
    * **Admin Dashboard**: Overview of platform activity and user management.
* **Review System**:
    * Submit star ratings and comments for completed tours.
    * Live calculation of average tour ratings.

---

## 💻 Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **State Management**: React Hooks & Context API
* **Forms**: React Hook Form
* **Payments**: @stripe/react-stripe-js
* **HTTP Client**: Axios
* **Notifications**: React Hot Toast

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── (auth)/             # Login & Register Routes
│   ├── (dashboard)/        # Protected Dashboard Layouts
│   ├── booking/            # Booking Confirmation Pages
│   ├── invoice/            # Printable Invoice Page
│   ├── payment/            # Stripe Payment Flow
│   ├── tours/              # Tour Listing & Details
│   ├── layout.tsx          # Root Layout (Navbar/Footer)
│   └── page.tsx            # Landing Page
├── components/
│   ├── shared/             # Reusable (Navbar, Footer, Loader)
│   ├── ui/                 # UI Elements (Cards, Buttons, Modals)
│   └── dashboard/          # Dashboard-specific Components
├── context/                # AuthContext & Global Providers
├── services/               # API Service Layer (Axios configuration)
├── types/                  # TypeScript Interfaces
└── utils/                  # Helper functions




