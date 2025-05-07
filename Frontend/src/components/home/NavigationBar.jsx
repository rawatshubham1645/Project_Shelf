import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Menu,
  X,
  TableOfContents,
  BookTemplate,
  Home,
  ClipboardEdit,
  PlusCircle,
  Edit3,
  User,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/home", icon: Home },
  { name: "Case Studies", href: "/home/case-studies", icon: TableOfContents },
  { name: "Case Templates", href: "/home/templates", icon: BookTemplate },
  { name: "Portfolio", href: "/home/preview", icon: ClipboardEdit },
];

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Update active section based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const currentNavItem = navigation.find(
      (item) =>
        currentPath === item.href || currentPath.startsWith(`${item.href}/`)
    );

    if (currentNavItem) {
      setActiveSection(currentNavItem.name);
    }
  }, [location.pathname]);

  // Close mobile menu when screen size becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleCreateForm = () => {
    navigate("/home/case-studies/create");
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 shadow-md z-30 px-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5 dark:text-white text-black" />
            ) : (
              <Menu className="h-5 w-5 text-primary" />
            )}
          </Button>
          
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center">
            <div className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center mr-2">
              <Edit3 className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">ProjectShelf</span>
          </div>
        </div>
        
        {/* Navigation Links - Only visible on desktop */}
        <div className="hidden lg:flex items-center space-x-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => {
                return cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                );
              }}
              end
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Notification button */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </Button>
          
          {/* Profile dropdown */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700">
                <NavLink to="/home/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Your Profile
                </NavLink>
                <NavLink to="/home/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Settings
                </NavLink>
                <div className="border-t dark:border-gray-700 my-1"></div>
                <NavLink to="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Sign out
                </NavLink>
              </div>
            )}
          </div>
          
          {/* Create Case Study button */}
          <Button
            variant="default"
            size="sm"
            className="hidden md:flex items-center"
            onClick={handleCreateForm}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            New Case Study
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/30 dark:bg-black/50 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Menu with glass effect and modern design */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:fixed",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "top-16" // Add top-16 to position below the top bar
        )}
      >
        <div className="flex flex-col h-full dark:glass-dark glass">
          {/* Logo area - removed for desktop as it's now in the top bar, only shown on mobile */}
          <div className="border-b dark:border-white/10 border-black/10 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 overflow-hidden relative lg:hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-5 right-10 w-16 h-16 bg-white/20 rounded-full animate-float"></div>
              <div className="absolute bottom-5 left-10 w-12 h-12 bg-yellow-300/30 rounded-full animate-float animation-delay-300"></div>
              <div className="absolute top-10 left-20 w-8 h-8 bg-orange-300/40 rounded-full animate-pulse"></div>
            </div>

            <div className="flex h-28 items-center justify-center px-6 relative z-10 rounded-b-3xl">
              <div className="relative flex items-center">
                <div className="w-10 h-10 rounded-lg bg-white/90 shadow-lg rotate-12 flex items-center justify-center mr-3 transform-gpu hover:rotate-0 transition-all duration-300">
                  <Edit3 className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-white text-shadow-lg relative tracking-tight">
                    ProjectShelf
                  </span>
                  <div className="h-1 w-full bg-white/50 rounded-full mt-1 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main navigation with hover effects and animations */}
          <div className="flex-1 space-y-1 p-6 overflow-auto">
            <nav className="flex flex-1 flex-col gap-3">
              {navigation.map((item, index) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => {
                    return cn(
                      "group flex items-center gap-3 rounded-xl px-4 py-4 text-sm font-medium transition-all duration-300 relative overflow-hidden animate-slide-up",
                      isActive
                        ? "bg-primary text-white shadow-lg"
                        : "dark:text-white/70 text-black/70 hover:text-primary dark:hover:text-white hover:bg-primary/10 dark:hover:bg-white/10",
                      `animation-delay-${index + 1}00`
                    );
                  }}
                  end
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-transform duration-300",
                      activeSection === item.name ? "" : "group-hover:scale-110"
                    )}
                  />
                  <span className="font-semibold">{item.name}</span>
                  {/* Glowing effect on active link */}
                  {activeSection === item.name && (
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Create form button */}
          <div className="p-6 border-t dark:border-white/10 border-black/10">
            <Button
              variant="3d"
              size="full"
              className="group h-14"
              onClick={handleCreateForm}
            >
              <PlusCircle className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create New Case Study
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
