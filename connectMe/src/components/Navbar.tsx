import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("connectme-user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("connectme-user");
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-sm sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Just Talk logo"
            className="block h-12 w-auto shrink-0 object-contain"
          />
          <div>
            <span className="block text-xl font-semibold tracking-tight text-slate-900">Just Talk</span>
            <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">Connect in real time</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="hidden items-center space-x-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 md:flex">
                {/* <img
                  src={currentUser.avatar || "/avatar-placeholder.png"}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                /> */}
                <span className="font-medium text-slate-700">{currentUser.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" className="rounded-full border border-slate-200 bg-white/80 px-4 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
