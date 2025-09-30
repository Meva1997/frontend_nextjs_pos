# POS - Point of Sale Application

A modern, full-featured Point of Sale (POS) web application built with [Next.js](https://nextjs.org), [React](https://react.dev), and [Tailwind CSS](https://tailwindcss.com). This project demonstrates advanced front-end engineering practices, component-driven development, and seamless integration with a backend API (NestJS).

**Live Demo:**  
[https://frontend-nextjs-k6ewcuw6w-alejandro-s-projects-f78c06da.vercel.app](https://frontend-nextjs-k6ewcuw6w-alejandro-s-projects-f78c06da.vercel.app)

---

## Features

- **Product Management**: Add, edit, and display products with images, prices, and stock levels.
- **Sales Management**: Manage transactions, apply discounts and coupons, and review sales history by date.
- **Shopping Cart**: Interactive cart with support for discounts and live updates.
- **Admin Dashboard**: Dedicated admin area for managing products and sales.
- **Responsive UI**: Optimized for desktop and mobile, powered by Tailwind CSS.
- **Image Uploads**: Drag-and-drop product image uploading with Cloudinary integration.
- **Notifications**: Toast notifications for user feedback (react-toastify).
- **API Integration**: Connects to a backend (NestJS) for data persistence and business logic.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **State Management:** Zustand, TanStack React Query
- **Validation:** Zod (schemas for products, orders, transactions)
- **Image Hosting:** Cloudinary
- **Notifications:** react-toastify
- **Backend (API):** NestJS (external, not included in this repo)

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Meva1997/frontend_nextjs_pos.git
cd frontend_nextjs_pos
npm install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

- `/app` - Next.js app router pages (Store, Admin, Layout)
- `/components` - UI and business logic components (Products, Sales, Cart, Uploads, Notifications)
- `/src` - Utilities and schema definitions
- `next.config.ts` - Next.js configuration (image domains, etc.)

---

## Key Files & Components

- `app/layout.tsx` - Main layout, provides global styles and app metadata
- `components/products/ProductForm.tsx` - Product creation/editing form
- `components/products/ProductsTable.tsx` - Product listing table
- `components/cart/ShoppingCart.tsx` - Cart functionality and display
- `components/sales/TransactionSummary.tsx` - Transaction details for sales
- `components/ui/ToastNotification.tsx` - Toast message integration
- `src/schemas.ts` - Zod schemas for data validation
- `src/utils.ts` - Utility functions (currency formatting, image paths, stock checks)

---

## Why This Project?

This POS app showcases:

- Real-world business logic (sales, products, discounts, cart)
- Modern front-end architecture principles
- Robust state management and API communication
- User experience considerations (responsive design, notifications)
- Familiarity with deployment (Vercel) and cloud integrations

---

## Demo

Try the live POS application:  
[https://frontend-nextjs-k6ewcuw6w-alejandro-s-projects-f78c06da.vercel.app](https://frontend-nextjs-k6ewcuw6w-alejandro-s-projects-f78c06da.vercel.app)

---

## Contact

For questions, opportunities, or more information, feel free to reach out via [GitHub profile](https://github.com/Meva1997).
