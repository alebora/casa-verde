import { useNavigate } from 'react-router-dom'
import { usePlants } from '@/hooks/usePlants'
import { PlantCard } from '@/components/plants/PlantCard'
import { Loader2, Plus, Sprout, Heart, Droplets } from 'lucide-react'

export function Dashboard() {
  const navigate = useNavigate()
  const { plants, loading, waterPlant, fertilizePlant, repotPlant, undoWatering, deletePlant } = usePlants()

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 relative" />
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading your plants...</p>
      </div>
    )
  }

  if (plants.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-emerald-100 to-teal-100 w-32 h-32 rounded-full flex items-center justify-center">
            <Sprout className="w-16 h-16 text-emerald-600 animate-float" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-slate-800 mb-3">
          Start Your Garden! 🌱
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          Begin your plant care journey by adding your first plant and watch it thrive!
        </p>
        <button
          onClick={() => navigate('/add')}
          className="btn-primary inline-flex items-center space-x-3"
        >
          <Plus size={24} />
          <span className="text-lg">Add Your First Plant</span>
        </button>
      </div>
    )
  }

  const thirstyPlants = plants.filter((plant) => {
    const nextWater = new Date(plant.last_watered_at)
    nextWater.setDate(nextWater.getDate() + plant.water_interval_days)
    return nextWater < new Date()
  })

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Your Plant Collection
        </h1>
        <p className="text-slate-600 text-lg">
          {thirstyPlants.length > 0 
            ? `${thirstyPlants.length} plant${thirstyPlants.length !== 1 ? 's' : ''} need${thirstyPlants.length === 1 ? 's' : ''} your attention!` 
            : 'All plants are happy and healthy!'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">Total Plants</p>
              <p className="text-4xl font-bold text-slate-800">{plants.length}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-2xl">
              <Sprout className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">Need Watering</p>
              <p className="text-4xl font-bold text-red-600">{thirstyPlants.length}</p>
            </div>
            <div className={`p-4 rounded-2xl ${
              thirstyPlants.length > 0 
                ? 'bg-red-100 animate-pulse' 
                : 'bg-slate-100'
            }`}>
              <Droplets className={`w-8 h-8 ${
                thirstyPlants.length > 0 ? 'text-red-600' : 'text-slate-400'
              }`} />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">Happy Plants</p>
              <p className="text-4xl font-bold text-emerald-600">
                {plants.length - thirstyPlants.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-4 rounded-2xl">
              <Heart className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Plants Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Your Plants ({plants.length})
          </h2>
          <button
            onClick={() => navigate('/add')}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Plant</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onWater={waterPlant}
              onFertilize={fertilizePlant}
              onRepot={repotPlant}
              onUndo={undoWatering}
              onDelete={deletePlant}
              onClick={(id) => navigate(`/plant/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}