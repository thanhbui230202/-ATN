import { Facebook, Twitter, Linkedin } from 'lucide-react';

import { useState, useEffect, useRef } from 'react';
import { Button } from '../astoms/button.js';
import {logout} from '../../api/UserAPI.js';
import { toast } from '../../hooks/use-toast.js';
interface TopNavProps {
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

export function Header({ onLogin, onRegister, onLogout }: TopNavProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  function decodeJWT(token: string) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: { username: string } = decodeJWT(token);
        setUser(decodedToken.username);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  

  const handleLogout = async () => {
    try {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      const token = localStorage.getItem("token");
      if (token) {
        await logout(token);
      }
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setUser(null);
      setIsLoggedIn(false);
      onLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    } 
  };

  return (
    <div className="w-full bg-black/90 px-4 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4 relative z-40">
          {isLoggedIn && user ? (
            <div 
              className="relative group"
              ref={dropdownRef}
            >
              <button
                className={`text-white focus:outline-none mr-20 py-2 px-4 border-2 ${
                  isDropdownOpen ? 'border-orange-500' : 'border-transparent'
                } rounded-md hover:border-orange-500 transition-colors duration-200`}
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                {user}
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute right-0 w-48 bg-gray-900/95 rounded-md shadow-lg z-50 transition-all duration-300 ${
                  isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-white font-medium">{user}</p>
                  </div>
                  <ul className="mt-2">
                    <li>
                      <a
                        href="/user-profile"
                        className="block px-4 py-2 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
                      >
                        Thông Tin
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
                      >
                        Đăng Xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={onLogin} className="text-gray-400 hover:text-white">
                <a href='/login'>
                Đăng Nhập
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={onRegister} className="text-gray-400 hover:text-white">
                <a href='/signup'>
                  Đăng Ký
                </a>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

