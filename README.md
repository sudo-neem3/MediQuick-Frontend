# MediQuick 🏥

MediQuick is a modern, MERN-stack academic project designed to provide a fast and reliable online pharmacy experience. This repository contains the **Frontend** of the application.

## 🚀 Features

- **Role-Based Access Control**: Separate dashboards for Customers, Pharmacies, and Admins.
- **Zustand State Management**: Persistent cart and authentication state.
- **Modern UI/UX**: Built with React and Vanilla CSS using glassmorphism and premium design tokens.
- **Responsive Design**: Fully functional across all device sizes.
- **API Integration**: Ready for backend connection with a centralized Axios instance.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Lucide](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **API Client**: [Axios](https://axios-http.com/)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and set your API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

- `src/api/`: API service layers.
- `src/components/`: Reusable UI components.
- `src/layouts/`: Dashboard and Public layout wrappers.
- `src/pages/`: Role-specific page implementations.
- `src/store/`: Zustand global state stores.
- `src/utils/`: Validators and helper functions.

## 📄 License

This project is for academic purposes.
