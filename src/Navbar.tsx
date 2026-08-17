import { Link, useLocation } from 'react-router-dom'
import { Home, MessageCircle, Plus, Sparkles, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

export function Navbar() {
  const location = useLocation()
  const { signOut } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="Casa Verde" 
              className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-200" 
            />
            <div>
              <span className="font-bold text-2xl text-emerald-600">
                Casa Verde
              </span>
              <p className="text-xs text-slate-500 font-medium">Plant Care Tracker</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`nav-link ${
                isActive('/') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <Home size={20} />
              <span className="hidden sm:inline font-medium">Dashboard</span>
            </Link>

            <Link
              to="/add"
              className={`nav-link ${
                isActive('/add') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <Plus size={20} />
              <span className="hidden sm:inline font-medium">Add Plant</span>
            </Link>

            <Link
              to="/chat"
              className={`nav-link ${
                isActive('/chat') ? 'nav-link-active' : 'nav-link-inactive'
              }`}
            >
              <div className="relative">
                <MessageCircle size={20} />
                <Sparkles className="w-3 h-3 text-amber-400 absolute -top-1 -right-1" />
              </div>
              <span className="hidden sm:inline font-medium">AI Assistant</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="nav-link nav-link-inactive"
              title="Logout"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}