import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, Outlet, useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';
import axios from 'axios'

const AdminLayout = () => {
	const navigate = useNavigate()
	
  const { auth, setAuth } = useAuth();

	const handleLogout = async () => {
		try {
			await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/logout`, { withCredentials: true }); 
			setAuth({"nik": "", "nama": "", "role": "", "profilePic" : ""})
      navigate('/')
		} catch (error) {
			console.error("Logout Error", error);
		}
	}

  return (
    <>
			<Helmet>
				<link href="/assets/css/app.min.css" rel="stylesheet" type="text/css"/>

				<link href="/assets/css/icons.min.css" rel="stylesheet" type="text/css"/>

				<script src="/assets/js/config.js"></script>
				<script defer src="/assets/libs/@frostui/tailwindcss/frostui.js"></script>
    		<script defer src="/assets/js/app.js"></script>
			</Helmet>
    	
			<div className="flex wrapper">
        <div className="app-menu">
            <Link to='/' className='logo-box'>
                <div className="logo-light">
									<div className="flex shrink-0 items-center logo-lg">
										<img
											alt="Your Company"
											src="/logoYTEAnav.jpg"
											className="h-14 w-auto rounded-full"
										/>
										<p className='md:text-xl ms-2 text-xl text-white font-semibold sm:block' style={{lineHeight: 1}}>Yanto Tanjung <br /> English Academy</p>
									</div>
                  <img src="/logoYTEAnav.jpg" className="logo-sm h-[50px] rounded-full" alt="Small logo"/>
                </div>
            </Link>

            <button id="button-hover-toggle" className="absolute top-5 end-2 rounded-full p-1.5 z-50">
                <span className="sr-only">Menu Toggle Button</span>
                <i className="ri-checkbox-blank-circle-line text-xl"></i>
            </button>

            <div className="scrollbar" data-simplebar>
                <ul className="menu" data-fc-type="accordion">
                    <li className="menu-title">Apps</li>

                    <li className="menu-item">
                        <NavLink
													to="/admin/payments"
													end
													className={({ isActive }) =>
														`menu-link flex items-center p-3 rounded transition-colors ${
															isActive
																? 'bg-gray-700 text-white'  // styling saat aktif
																: 'hover:bg-gray-700 text-gray-200'
														}`
													}
												>
													<span className="menu-icon">
														<i className="ri-money-dollar-circle-line"></i>
													</span>
													<span className="menu-text">Pembayaran</span>
												</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink
													to="/admin/dashboard"
													end
													className={({ isActive }) =>
														`menu-link flex items-center p-3 rounded transition-colors ${
															isActive
																? 'bg-gray-700 text-white'  // styling saat aktif
																: 'hover:bg-gray-700 text-gray-200'
														}`
													}
												>
													<span className="menu-icon">
														<i className="ri-money-dollar-circle-line"></i>
													</span>
													<span className="menu-text">Pembayaran</span>
												</NavLink>
                    </li>
                </ul>

            </div>
        </div>

        <div className="page-content">

            <header className="app-header flex items-center px-4 gap-3.5">
                <Link to='/' className="logo-box">
                    <div className="logo-dark">
                        <img src="/logoYTEAnav.jpg" className="logo-sm h-[50px]" alt="Small logo"/>
                    </div>
                </Link>
                <button id="button-toggle-menu" className="nav-link p-2">
                    <span className="sr-only">Menu Toggle Button</span>
                    <span className="flex items-center justify-center">
                        <i className="ri-menu-2-fill text-2xl"></i>
                    </span>
                </button>
                <div className="relative ms-auto">
                    <button data-fc-type="dropdown" data-fc-placement="bottom-end" type="button" className="nav-link flex items-center gap-2.5 px-3 bg-black/5 border-x border-black/10">
                        <img src={`${process.env.REACT_APP_API_BASE_URL}/${auth?.profilePic}`} alt="user-image" className="rounded-full h-8"/>
                        <span className="md:flex flex-col gap-0.5 text-start hidden">
                            <h5 className="text-sm">{auth.nama}</h5>
                            {/* <span className="text-xs">Founder</span> */}
                        </span>
                    </button>

                    <div className="fc-dropdown fc-dropdown-open:opacity-100 hidden opacity-0 w-44 z-50 transition-all duration-300 bg-white shadow-lg border rounded-lg py-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                        <h6 className="flex items-center py-2 px-3 text-xs text-gray-800 dark:text-gray-400">Welcome !</h6>

                        <a href="pages-profile.html" className="flex items-center gap-2 py-1.5 px-4 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                            <i className="ri-account-circle-line text-lg align-middle"></i>
                            <span>My Account</span>
                        </a>

                        
                        <a href="pages-profile.html" className="flex items-center gap-2 py-1.5 px-4 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                            <i className="ri-settings-4-line text-lg align-middle"></i>
                            <span>Settings</span>
                        </a>

                        
                        <a href="pages-faqs.html" className="flex items-center gap-2 py-1.5 px-4 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                            <i className="ri-customer-service-2-line text-lg align-middle"></i>
                            <span>Support</span>
                        </a>

                        
                        <a href="auth-lock-screen.html" className="flex items-center gap-2 py-1.5 px-4 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                            <i className="ri-lock-password-line text-lg align-middle"></i>
                            <span>Lock Screen</span>
                        </a>

                        
                        <a href="auth-logout-2.html" className="flex items-center gap-2 py-1.5 px-4 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                            <i className="ri-logout-box-line text-lg align-middle"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </div>
            </header>

            <main className="p-6">
							<Outlet />
            </main>
        </div>
    </div>
    </>
  )
}

export default AdminLayout