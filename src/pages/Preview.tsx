import { useNavigate } from 'react-router-dom'
import { Sprout, Droplets, MessageCircle, Users, Shield, Zap, ArrowRight, Eye } from 'lucide-react'

export function Preview() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Sprout,
      title: 'Smart Plant Database',
      description: 'Auto-fill care schedules with expert recommendations for 30+ plant species. Get instant watering, fertilizing, and repotting intervals tailored to your specific plant type.'
    },
    {
      icon: Droplets,
      title: 'Intelligent Reminders',
      description: 'Never forget to water your plants again with smart, species-specific watering schedules. Track overdue plants at a glance with color-coded status indicators.'
    },
    {
      icon: MessageCircle,
      title: 'AI Plant Expert',
      description: 'Get instant answers to all your plant care questions. Our AI assistant provides expert advice on watering, lighting, pest problems, and more - available 24/7.'
    },
    {
      icon: Users,
      title: 'Multi-User Support',
      description: 'Each user has their own private plant collection with secure authentication. Perfect for households or offices with multiple plant caregivers.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your plant data is protected with enterprise-grade row-level security. Only you can see and manage your plants.'
    },
    {
      icon: Zap,
      title: 'Undo Actions',
      description: 'Made a mistake? Undo any watering, fertilizing, or repotting action with a single click. Full care history tracking for every plant.'
    }
  ]

  const demoPlants = [
    {
      name: 'Monty the Monstera',
      species: 'Monstera deliciosa',
      status: 'Water in 3 days',
      statusColor: 'text-emerald-600'
    },
    {
      name: 'Sunny the Snake Plant',
      species: 'Sansevieria trifasciata',
      status: 'Water in 10 days',
      statusColor: 'text-emerald-600'
    },
    {
      name: 'Penny the Pothos',
      species: 'Epipremnum aureum',
      status: 'Overdue by 2 days',
      statusColor: 'text-red-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Casa Verde" className="w-12 h-12" />
              <div>
                <span className="font-bold text-2xl text-emerald-600">
                  Casa Verde
                </span>
                <p className="text-xs text-slate-500 font-medium">Plant Care Tracker</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 text-slate-700 font-semibold hover:text-emerald-600 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-50 rounded-full mb-6">
            <Eye className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-sm font-semibold text-emerald-700">Preview Mode - Demo Only</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Keep Your Plants Thriving
          </h1>
          <p className="text-xl text-slate-600 mb-4 max-w-2xl mx-auto">
            Track watering schedules, get AI-powered care advice, and never forget to care for your plants again.
          </p>
          <p className="text-lg text-emerald-600 font-semibold mb-8 max-w-2xl mx-auto">
            Smart auto-fill for 30+ plant species | Sidekick AI plant expert | Personalized care schedules and ai generated care tips
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center space-x-2"
            >
              <span>Try It Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#demo"
              className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border-2 border-slate-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Everything You Need to Care for Your Plants
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-slate-600">
              Here's what your dashboard could look like
            </p>
          </div>

          {/* Mock Dashboard */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Mock Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-slate-50">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium mb-1">Total Plants</p>
                    <p className="text-4xl font-bold text-slate-800">3</p>
                  </div>
                  <div className="bg-emerald-100 p-4 rounded-xl">
                    <Sprout className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium mb-1">Need Watering</p>
                    <p className="text-4xl font-bold text-red-600">1</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-xl">
                    <Droplets className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium mb-1">Happy Plants</p>
                    <p className="text-4xl font-bold text-emerald-600">2</p>
                  </div>
                  <div className="bg-emerald-100 p-4 rounded-xl">
                    <Sprout className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Plant Cards */}
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Your Plants</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {demoPlants.map((plant, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-emerald-200 transition-all"
                  >
                    <h4 className="font-bold text-lg text-slate-800 mb-1">
                      {plant.name}
                    </h4>
                    <p className="text-sm text-slate-500 italic mb-4">{plant.species}</p>
                    <div className="flex items-center text-sm mb-4 px-3 py-2 rounded-lg bg-slate-50">
                      <Droplets size={14} className="mr-2" />
                      <span className={`font-semibold ${plant.statusColor}`}>
                        {plant.status}
                      </span>
                    </div>
                    <button
                      className={`w-full py-2 rounded-lg font-bold ${
                        plant.status.includes('Overdue')
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                      disabled={!plant.status.includes('Overdue')}
                    >
                      {plant.status.includes('Overdue') ? 'Water Now' : '✓ All Good'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Feature Highlights */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Powerful Features Built In
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Auto-fill Feature */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-emerald-200">
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-xl flex-shrink-0">
                  <Zap className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Smart Auto-Fill Plant Database
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Simply start typing your plant's name and select from 30+ common houseplants. We'll automatically fill in the perfect care schedule including:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Watering frequency (e.g., every 7 days for Monstera)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Fertilizing schedule (e.g., every 30 days)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Repotting intervals (e.g., every 24 months)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Light requirements and difficulty level</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AI Assistant Feature */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    24/7 AI Plant Care Expert
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Get instant, expert answers to all your plant questions powered by advanced AI. Ask anything about:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">💬</span>
                      <span>"Why are my monstera's leaves turning yellow?"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">💬</span>
                      <span>"How much light does a snake plant need?"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">💬</span>
                      <span>"When should I repot my plants?"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">💬</span>
                      <span>"How do I know if I'm overwatering?"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Growing?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join Casa Verde today and keep your plants healthy and thriving.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-xl inline-flex items-center space-x-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/logo.png" alt="Casa Verde" className="w-8 h-8" />
            <span className="font-bold text-xl text-emerald-600">Casa Verde</span>
          </div>
          <p className="text-slate-600 text-sm">
            Built with React, TypeScript, Supabase & Tailwind CSS
          </p>
          <p className="text-slate-500 text-xs mt-2">
            © 2024 Casa Verde. Portfolio project.
          </p>
        </div>
      </footer>
    </div>
  )
}