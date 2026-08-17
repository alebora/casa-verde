import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Navbar } from '@/components/layout/Navbar'
import { Dashboard } from '@/pages/Dashboard'
import { AddPlant } from '@/pages/AddPlant'
import { ChatBot } from '@/pages/ChatBot'
import { PlantDetail } from '@/pages/PlantDetail'
import { Login } from '@/pages/Login'
import { Preview } from '@/pages/Preview'
import { Loader2 } from 'lucide-react'

function App() {
  const { user, loading } = useAuth()

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
      </div>
    )
  }

  return (
    <Routes>
      {/* Public preview route */}
      <Route path="/preview" element={<Preview />} />
      
      {/* Login route */}
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      
      {/* Protected routes */}
      <Route
        path="/*"
        element={
          user ? (
            <div className="min-h-screen bg-white">
              <Navbar />
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/add" element={<AddPlant />} />
                  <Route path="/plant/:id" element={<PlantDetail />} />
                  <Route path="/chat" element={<ChatBot />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          ) : (
            <Navigate to="/preview" />
          )
        }
      />
    </Routes>
  )
}

export default App