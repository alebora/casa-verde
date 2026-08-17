import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { plantService } from '@/services/plantService'
import { careLogService } from '@/services/careLogService'
import { Plant } from '@/types/plant'
import { CareLog } from '@/types/careLog'
import { 
  ArrowLeft, 
  Droplets, 
  Sprout, 
  Calendar, 
  MapPin, 
  Edit, 
  Trash2,
  Loader2,
  Undo2,
  Clock
} from 'lucide-react'
import { getNextWaterDate, getNextFertilizeDate, getNextRepotDate, isOverdue, getDaysUntil, getTimeAgo } from '@/utils/dates'
import toast from 'react-hot-toast'

export function PlantDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [plant, setPlant] = useState<Plant | null>(null)
  const [careLogs, setCareLogs] = useState<CareLog[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchPlantData()
    }
  }, [id])

  const fetchPlantData = async () => {
    if (!id) return
    
    try {
      setLoading(true)
      const plantData = await plantService.getById(id)
      setPlant(plantData)
      
      // Try to fetch care logs, but don't fail if table doesn't exist
      try {
        const logsData = await careLogService.getByPlantId(id)
        setCareLogs(logsData)
      } catch (error) {
        console.warn('Care logs not available:', error)
        setCareLogs([])
      }
    } catch (error) {
      toast.error('Failed to load plant details')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleWater = async () => {
    if (!id) return
    
    try {
      setActionLoading(true)
      await plantService.water(id)
      toast.success('Plant watered! 💧')
      await fetchPlantData()
    } catch (error) {
      toast.error('Failed to water plant')
    } finally {
      setActionLoading(false)
    }
  }

  const handleFertilize = async () => {
    if (!id) return
    
    try {
      setActionLoading(true)
      await plantService.fertilize(id)
      toast.success('Plant fertilized! 🌱')
      await fetchPlantData()
    } catch (error) {
      toast.error('Failed to fertilize plant')
    } finally {
      setActionLoading(false)
    }
  }

  const handleRepot = async () => {
    if (!id) return
    
    try {
      setActionLoading(true)
      await plantService.repot(id)
      toast.success('Plant repotted! 🪴')
      await fetchPlantData()
    } catch (error) {
      toast.error('Failed to repot plant')
    } finally {
      setActionLoading(false)
    }
  }

  const handleUndoAction = async (logId: string, actionType: string) => {
    if (!id || !plant) return
    
    if (!confirm(`Are you sure you want to undo this ${actionType} action?`)) {
      return
    }
    
    try {
      setActionLoading(true)
      
      // Find the previous care log of the same type
      const logsOfType = careLogs
        .filter(log => log.care_type === actionType && log.id !== logId)
        .sort((a, b) => new Date(b.performed_at).getTime() - new Date(a.performed_at).getTime())
      
      const previousLog = logsOfType[0]
      const previousDate = previousLog ? previousLog.performed_at : null
      
      // Update the plant based on action type
      const updates: Partial<Plant> = {}
      
      if (actionType === 'water') {
        updates.last_watered_at = previousDate || new Date(Date.now() - plant.water_interval_days * 24 * 60 * 60 * 1000).toISOString()
      } else if (actionType === 'fertilize') {
        updates.last_fertilized_at = previousDate || undefined
      } else if (actionType === 'repot') {
        updates.last_repotted_at = previousDate || undefined
      }
      
      await plantService.update(id, updates)
      await careLogService.delete(logId)
      
      toast.success(`${actionType} action undone`)
      await fetchPlantData()
    } catch (error) {
      toast.error('Failed to undo action')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!id || !plant) return
    
    if (!confirm(`Are you sure you want to delete ${plant.nickname}? This action cannot be undone.`)) {
      return
    }
    
    try {
      await plantService.delete(id)
      toast.success('Plant deleted')
      navigate('/')
    } catch (error) {
      toast.error('Failed to delete plant')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
        <p className="mt-4 text-slate-600">Loading plant details...</p>
      </div>
    )
  }

  if (!plant) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Plant not found</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    )
  }

  const nextWaterDate = getNextWaterDate(plant.last_watered_at, plant.water_interval_days)
  const needsWater = isOverdue(nextWaterDate)
  const waterDaysUntil = getDaysUntil(nextWaterDate)

  const nextFertilizeDate = plant.last_fertilized_at && plant.fertilize_interval_days
    ? getNextFertilizeDate(plant.last_fertilized_at, plant.fertilize_interval_days)
    : null
  const needsFertilize = nextFertilizeDate ? isOverdue(nextFertilizeDate) : false
  const fertilizeDaysUntil = nextFertilizeDate ? getDaysUntil(nextFertilizeDate) : null

  const nextRepotDate = plant.last_repotted_at && plant.repot_interval_months
    ? getNextRepotDate(plant.last_repotted_at, plant.repot_interval_months)
    : null
  const needsRepot = nextRepotDate ? isOverdue(nextRepotDate) : false
  const repotDaysUntil = nextRepotDate ? getDaysUntil(nextRepotDate) : null

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Dashboard</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="glass-card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {plant.nickname}
                </h1>
                <p className="text-xl text-slate-600 italic font-medium mb-3">{plant.species}</p>
                {plant.variety && (
                  <p className="text-sm text-slate-500">Variety: {plant.variety}</p>
                )}
                {plant.location && (
                  <div className="flex items-center mt-2 text-slate-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{plant.location}</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleDelete}
                  className="p-3 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete plant"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>

            {plant.notes && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-900 leading-relaxed">{plant.notes}</p>
              </div>
            )}
          </div>

          {/* Care Actions Card */}
          <div className="glass-card">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Care Actions</h2>
            <div className="space-y-4">
              {/* Water */}
              <div className={`p-6 rounded-2xl border-2 ${needsWater ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${needsWater ? 'bg-red-100' : 'bg-blue-100'}`}>
                      <Droplets className={`w-6 h-6 ${needsWater ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">Watering</h3>
                      <p className="text-sm text-slate-600">
                        Last watered {getTimeAgo(plant.last_watered_at)}
                      </p>
                    </div>
                  </div>
                  {needsWater ? (
                    <span className="badge badge-danger">Overdue!</span>
                  ) : (
                    <span className="badge badge-success">On track</span>
                  )}
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  {needsWater
                    ? `Overdue by ${Math.abs(waterDaysUntil)} day${Math.abs(waterDaysUntil) !== 1 ? 's' : ''}`
                    : `Next watering in ${waterDaysUntil} day${waterDaysUntil !== 1 ? 's' : ''}`}
                </p>
                <button
                  onClick={handleWater}
                  disabled={actionLoading}
                  className="w-full btn-primary"
                >
                  {actionLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Water Now'}
                </button>
              </div>

              {/* Fertilize */}
              {plant.fertilize_interval_days && (
                <div className={`p-6 rounded-2xl border-2 ${needsFertilize ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${needsFertilize ? 'bg-amber-100' : 'bg-green-100'}`}>
                        <Sprout className={`w-6 h-6 ${needsFertilize ? 'text-amber-600' : 'text-green-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">Fertilizing</h3>
                        <p className="text-sm text-slate-600">
                          {plant.last_fertilized_at 
                            ? `Last fertilized ${getTimeAgo(plant.last_fertilized_at)}`
                            : 'Never fertilized'}
                        </p>
                      </div>
                    </div>
                    {needsFertilize ? (
                      <span className="badge badge-warning">Due</span>
                    ) : (
                      <span className="badge badge-success">On track</span>
                    )}
                  </div>
                  {fertilizeDaysUntil !== null && (
                    <p className="text-sm text-slate-700 mb-4">
                      {needsFertilize
                        ? `Overdue by ${Math.abs(fertilizeDaysUntil)} day${Math.abs(fertilizeDaysUntil) !== 1 ? 's' : ''}`
                        : `Next fertilizing in ${fertilizeDaysUntil} day${fertilizeDaysUntil !== 1 ? 's' : ''}`}
                    </p>
                  )}
                  <button
                    onClick={handleFertilize}
                    disabled={actionLoading}
                    className="w-full btn-primary"
                  >
                    {actionLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Fertilize Now'}
                  </button>
                </div>
              )}

              {/* Repot */}
              {plant.repot_interval_months && (
                <div className={`p-6 rounded-2xl border-2 ${needsRepot ? 'bg-purple-50 border-purple-200' : 'bg-indigo-50 border-indigo-200'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${needsRepot ? 'bg-purple-100' : 'bg-indigo-100'}`}>
                        <Calendar className={`w-6 h-6 ${needsRepot ? 'text-purple-600' : 'text-indigo-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">Repotting</h3>
                        <p className="text-sm text-slate-600">
                          {plant.last_repotted_at 
                            ? `Last repotted ${getTimeAgo(plant.last_repotted_at)}`
                            : 'Never repotted'}
                        </p>
                      </div>
                    </div>
                    {needsRepot ? (
                      <span className="badge badge-warning">Due</span>
                    ) : (
                      <span className="badge badge-success">On track</span>
                    )}
                  </div>
                  {repotDaysUntil !== null && (
                    <p className="text-sm text-slate-700 mb-4">
                      {needsRepot
                        ? `Overdue by ${Math.abs(repotDaysUntil)} day${Math.abs(repotDaysUntil) !== 1 ? 's' : ''}`
                        : `Next repotting in ${repotDaysUntil} day${repotDaysUntil !== 1 ? 's' : ''}`}
                    </p>
                  )}
                  <button
                    onClick={handleRepot}
                    disabled={actionLoading}
                    className="w-full btn-primary"
                  >
                    {actionLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Repot Now'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Care History Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>Care History</span>
            </h2>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {careLogs.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">
                  No care history yet. Start caring for your plant!
                </p>
              ) : (
                careLogs.map((log) => (
                  <div key={log.id} className="bg-white rounded-xl p-4 border-2 border-slate-100 group hover:border-emerald-200 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {log.care_type === 'water' && <Droplets className="w-4 h-4 text-blue-500" />}
                        {log.care_type === 'fertilize' && <Sprout className="w-4 h-4 text-green-500" />}
                        {log.care_type === 'repot' && <Calendar className="w-4 h-4 text-purple-500" />}
                        <span className="font-semibold text-sm text-slate-700 capitalize">
                          {log.care_type}
                        </span>
                      </div>
                      <button
                        onClick={() => handleUndoAction(log.id, log.care_type)}
                        disabled={actionLoading}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-amber-50 rounded-lg"
                        title="Undo this action"
                      >
                        <Undo2 className="w-4 h-4 text-amber-600" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500">{getTimeAgo(log.performed_at)}</p>
                    {log.notes && (
                      <p className="text-xs text-slate-600 mt-2 italic">{log.notes}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}