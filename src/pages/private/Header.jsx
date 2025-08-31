// 






import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosLogOut, IoIosMenu, IoIosClose } from "react-icons/io";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../http';
import { enqueueSnackbar } from 'notistack';
import { clearCredentials } from '../../redux/slices/userSlice';

const Header = () => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutMutation = useMutation({
      mutationFn: () => logout(),
      onSuccess: (data) => {
        dispatch(clearCredentials());
        enqueueSnackbar(data.message, { variant: "success"});
      },
      onError: (error) => {
        const { response } = error;
        enqueueSnackbar(response.data.message, { variant: "error"});
      }
    });

    const handleLogout = () => {
      console.log("Logging out...");
      logoutMutation.mutate();
      history.push("/");
    };

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
      <header className="relative z-10 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 flex-shrink-0">
        <div className="px-4 sm:px-6 py-4 w-full mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo and title */}
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white">KM GROUP Dashboard</h1>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-shrink-0"></div>
              <span className="text-gray-300">{userInfo.username || "Admin"}</span>
              <div className='cursor-pointer text-white hover:text-red-500 transition-colors duration-200'>
                <IoIosLogOut
                  onClick={handleLogout}
                  className='' 
                  size={30} 
                  title='logout'
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <IoIosClose size={32} />
                ) : (
                  <IoIosMenu size={32} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700/50">
              <div className="flex flex-col items-center pt-4 space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-lg">{userInfo.username || "Admin"}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:text-red-500 transition-colors duration-200 py-2 px-4 rounded-lg bg-gray-700/50"
                >
                  <IoIosLogOut size={24} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
};

export default Header;