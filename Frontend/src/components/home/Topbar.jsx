import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "@/redux/features/user/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  ScanEye,
  FileEdit,
  LogOut,
  User,
  Search,
  BellRing,
  Sparkles,
  ChevronDown,
  X,
  Moon,
  Sun,
  Home,
  TableOfContents,
  BookTemplate,
  ClipboardEdit,
  PlusCircle,
} from "lucide-react";
import { useTheme } from "../theme-provider";

function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  
  // Navigation links
  const navLinks = [
    { name: "Dashboard", href: "/home", icon: Home },
    { name: "Case Studies", href: "/home/case-studies", icon: TableOfContents },
    { name: "Case Templates", href: "/home/templates", icon: BookTemplate },
    { name: "Portfolio", href: "/home/preview", icon: ClipboardEdit },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div className="sticky top-0 z-40 dark:bg-[rgba(0,0,0,0.7)] dark:backdrop-blur-md bg-white/90 backdrop-blur-md transition-all duration-300 border-b dark:border-white/10 border-black/10 shadow-md">
      {/* Top row with logo and actions */}
      <div className="flex h-16 items-center gap-4 px-6 lg:px-10">
        {/* Space for mobile menu button */}
        <div className="w-8 lg:hidden" />

        <div className="flex flex-1 items-center justify-between">
          {/* Logo or placeholder for left side */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">ProjectShelf</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Theme Toggle */}
            <Button
              variant="glass"
              size="icon"
              className="h-10 w-10 rounded-full dark:bg-white/15 bg-black/10 dark:text-white text-black border border-black/10 dark:border-white/20"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 text-orange-500 rotate-0 scale-100 transition-all duration-300 dark:rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 text-primary rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            </Button>

            {!user?.uniqueName ? (
              <Button
                variant="glass"
                onClick={() => navigate("/home/profile")}
                className="rounded-full dark:bg-white/15 bg-black/5 dark:text-white text-black border border-black/10 dark:border-white/20"
              >
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Profile Setup</span>
              </Button>
            ) : (
              <Button
                variant="glass"
                onClick={() => {
                  const url = `${window.location.origin}/user/${user.uniqueName}`;
                  window.open(url, "_blank");
                }}
                className="rounded-full dark:bg-white/15 bg-black/10 dark:text-white text-black border border-black/10 dark:border-white/20 hover:bg-black/15 dark:hover:bg-white/20"
              >
                <ScanEye className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Live Preview</span>
              </Button>
            )}

            {/* Create Case Study Button */}
            <Button
              variant="outline-bold"
              onClick={() => navigate("/home/case-studies/create")}
              className="rounded-full hidden md:flex"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Case Study
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full pl-2 pr-3 py-1.5 flex items-center space-x-2 dark:bg-white/15 bg-black/5 dark:hover:bg-white/20 hover:bg-black/10 border dark:border-white/20 border-black/10"
                >
                  <Avatar className="h-8 w-8 border dark:border-white/20 border-black/20">
                    <AvatarImage
                      src={user?.profileImage}
                      alt={user?.firstName || "User"}
                    />
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {user?.firstName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    <span className="text-sm font-medium dark:text-white text-black hidden md:inline-block max-w-[100px] truncate">
                      {user?.firstName || "User"}
                    </span>
                    <ChevronDown className="h-4 w-4 dark:text-white/70 text-black/70 ml-1" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 mt-2 dark:bg-black/80 dark:backdrop-blur-md bg-white/95 backdrop-blur-md border dark:border-white/20 border-black/10"
                align="end"
                forceMount
              >
                <div className="flex flex-col items-center justify-center p-4 border-b dark:border-white/10 border-black/10">
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage
                      src={user?.profileImage}
                      alt={user?.firstName || "User"}
                    />
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold text-xl">
                      {user?.firstName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="text-base font-semibold dark:text-white text-black">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm dark:text-white/60 text-black/60 truncate max-w-[180px]">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="p-2">
                  <DropdownMenuItem
                    onClick={() => navigate("/home/profile")}
                    className="flex items-center p-3 dark:hover:bg-white/10 hover:bg-black/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <User className="h-4 w-4 mr-3 dark:text-white/70 text-black/70" />
                    <div className="dark:text-white text-black">
                      Profile Settings
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center p-3 hover:bg-destructive/20 rounded-lg transition-colors cursor-pointer text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    <div>Log out</div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Navigation Links Row */}
      <div className="flex h-12 items-center justify-center border-t dark:border-white/10 border-black/10 px-6 lg:px-10 bg-white/50 dark:bg-black/50">
        <div className="flex items-center space-x-1 overflow-x-auto hide-scrollbar">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.href)}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors dark:text-white/70 text-black/70 hover:text-primary dark:hover:text-white hover:bg-primary/10 dark:hover:bg-white/10"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
