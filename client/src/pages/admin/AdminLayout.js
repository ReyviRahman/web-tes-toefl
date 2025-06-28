import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { FiMenu, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RiDashboardLine, RiMoneyDollarCircleLine, RiLogoutBoxLine } from "react-icons/ri";

const AdminLayout = () => {
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop only
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/logout`, { withCredentials: true }); 
      setAuth({"nik": "", "nama": "", "role": "", "profilePic" : ""});
      navigate('/');
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  // Sidebar width helper
  const sidebarDesktopClass = sidebarCollapsed ? "w-16" : "w-64";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Overlay untuk mobile */}
      {sidebarOpenMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpenMobile(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 inset-y-0 left-0 bg-white border-r
          transform
          ${sidebarOpenMobile ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-200 ease-in-out
          md:static md:inset-0 md:translate-x-0
          flex flex-col
          ${sidebarDesktopClass}
        `}
        style={{ minHeight: "100vh" }}
      >
        {/* Top logo + collapse btn */}
        <div className="flex items-center h-16 px-4 border-b">
          <Link to="/" className={`flex items-center transition-all duration-200 ${sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            <img src="/logoYTEAnav.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
            {!sidebarCollapsed && <span className="ml-3 font-bold text-lg">YTEA Admin</span>}
          </Link>
          {/* Tombol collapse hanya di desktop, kanan logo */}
          <button
            className="hidden md:inline-flex p-2 ml-auto rounded hover:bg-gray-100 transition"
            onClick={() => setSidebarCollapsed(val => !val)}
            title={sidebarCollapsed ? "Perbesar Sidebar" : "Kecilkan Sidebar"}
          >
            {sidebarCollapsed ? <FiChevronRight size={22} /> : <FiChevronLeft size={22} />}
          </button>
          {/* Tombol close sidebar hanya tampil di mobile */}
          <button
            className="ml-2 p-2 rounded hover:bg-gray-100 transition md:hidden"
            onClick={() => setSidebarOpenMobile(false)}
            title="Tutup Sidebar"
          >
            <FiX size={24} />
          </button>
        </div>
        {/* Menu */}
        <nav className="flex-1 px-2 py-6">
          <ul className={`space-y-2 flex flex-col ${sidebarCollapsed ? 'items-center' : 'items-stretch'}`}>
            <li className={`w-full ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
              <NavLink 
                to="/admin/payments" 
                className={({ isActive }) => 
                  `flex items-center px-2 py-2 rounded-lg transition font-medium ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 text-gray-700'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`
                }
                onClick={() => setSidebarOpenMobile(false)}
              >
                <RiMoneyDollarCircleLine size={22} />
                {!sidebarCollapsed && <span className="ml-3">Pembayaran</span>}
              </NavLink>
            </li>
            <li className={`w-full ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
              <NavLink 
                to="/admin/dashboard" 
                className={({ isActive }) => 
                  `flex items-center px-2 py-2 rounded-lg transition font-medium ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 text-gray-700'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`
                }
                onClick={() => setSidebarOpenMobile(false)}
              >
                <RiDashboardLine size={22} />
                {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button
            className={`w-full flex items-center py-2 px-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition font-semibold ${sidebarCollapsed ? 'justify-center' : ''}`}
            onClick={handleLogout}
          >
            <RiLogoutBoxLine size={22} />
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="h-16 bg-white border-b flex items-center px-6 justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Tombol hamburger hanya untuk mobile */}
            <button
              className="p-2 rounded hover:bg-gray-100 md:hidden"
              onClick={() => setSidebarOpenMobile(true)}
              title="Buka Sidebar"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="font-semibold text-xl text-gray-700">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{auth?.nama}</span>
            <img
              src={auth?.profilePic ? `${process.env.REACT_APP_API_BASE_URL}/${auth.profilePic}` : '/logoYTEAnav.jpg'}
              alt="Profile"
              className="h-8 w-8 rounded-full border"
            />
          </div>
        </header>
        <main className="flex-1 p-6 w-[425px] md:w-[600px] lg:w-full">
          <Outlet />
        </main>


      </div>
    </div>
  );
};

export default AdminLayout;
