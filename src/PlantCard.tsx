import { useState } from 'react'
import { Droplets, Calendar, AlertCircle, Trash2, MapPin, Undo2, Sprout } from 'lucide-react'
import { Plant } from '@/types/plant'
import { getNextWaterDate, getNextFertilizeDate, getNextRepotDate, isOverdue, getDaysUntil } from '@/utils/dates'

interface PlantCardProps {
  plant: Plant
  onWater: (id: string) => void
  onFertilize: (id: string) => void
  onRepot: (id: string) => void
  onDelete: (id: string) => void
  onUndo?: (id: string) => void
  onClick: (id: string) => void
}

export function PlantCard({ plant, onWater, onFertilize, onRepot, onDelete, onUndo, onClick }: PlantCardProps) {
  const [showUndo, setShowUndo] = useState(false)
  const nextWaterDate = getNextWaterDate(plant.last_watered_at, plant.water_interval_days)
  const needsWater = isOverdue(nextWaterDate)
  const waterDaysUntil = getDaysUntil(nextWaterDate)

  // Check fertilize status
  const nextFertilizeDate = plant.last_fertilized_at && plant.fertilize_interval_days
    ? getNextFertilizeDate(plant.last_fertilized_at, plant.fertilize_interval_days)
    : null
  const needsFertilize = nextFertilizeDate ? isOverdue(nextFertilizeDate) : false

  // Check repot status
  const nextRepotDate = plant.last_repotted_at && plant.repot_interval_months
    ? getNextRepotDate(plant.last_repotted_at, plant.repot_interval_months)
    : null
  const needsRepot = nextRepotDate ? isOverdue(nextRepotDate) : false

  // Check if plant was recently watered (within last 5 minutes)
  const lastWateredTime = new Date(plant.last_watered_at).getTime()
  const now = Date.now()
  const wasRecentlyWatered = (now - lastWateredTime) < 5 * 60 * 1000 // 5 minutes

  const handleWater = (e: React.MouseEvent) => {
    e.stopPropagation()
    onWater(plant.id)
    setShowUndo(true)
    // Hide undo button after 10 seconds
    setTimeout(() => setShowUndo(false), 10000)
  }

  const handleFertilize = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFertilize(plant.id)
  }

  const handleRepot = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRepot(plant.id)
  }

  const handleUndo = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onUndo) {
      onUndo(plant.id)
      setShowUndo(false)
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Are you sure you want to delete ${plant.nickname}?`)) {
      onDelete(plant.id)
    }
  }

  // Count how many actions are needed
  const actionsNeeded = [needsWater, needsFertilize, needsRepot].filter(Boolean).length

  return (
    <div
      onClick={() => onClick(plant.id)}
      className="plant-card p-6 cursor-pointer group"
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-50 rounded-xl z-10 transform hover:scale-110"
        title="Delete plant"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-xl text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">
            {plant.nickname}
          </h3>
          <p className="text-sm text-slate-500 italic font-medium">{plant.species}</p>
          {plant.location && (
            <div className="flex items-center mt-2 text-xs text-slate-400">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{plant.location}</span>
            </div>
          )}
        </div>
        
        {/* Status Badge */}
        {actionsNeeded > 0 && (
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
            {actionsNeeded} {actionsNeeded === 1 ? 'action' : 'actions'} needed
          </div>
        )}
      </div>

      {/* Status Messages */}
      <div className="space-y-2 mb-4">
        {/* Water Status */}
        <div className={`flex items-center text-sm px-3 py-2 rounded-xl ${
          needsWater ? 'bg-red-50 border-2 border-red-200' : 'bg-slate-50'
        }`}>
          <Droplets size={14} className={`mr-2 flex-shrink-0 ${needsWater ? 'text-red-600' : 'text-blue-500'}`} />
          <span className={needsWater ? 'text-red-700 font-semibold' : 'text-slate-600'}>
            {needsWater ? (
              <>
                Water overdue by {Math.abs(waterDaysUntil)} day{Math.abs(waterDaysUntil) !== 1 ? 's' : ''}!
              </>
            ) : (
              <>
                Water in {waterDaysUntil} day{waterDaysUntil !== 1 ? 's' : ''}
              </>
            )}
          </span>
        </div>

        {/* Fertilize Status */}
        {plant.fertilize_interval_days && (
          <div className={`flex items-center text-sm px-3 py-2 rounded-xl ${
            needsFertilize ? 'bg-amber-50 border-2 border-amber-200' : 'bg-slate-50'
          }`}>
            <Sprout size={14} className={`mr-2 flex-shrink-0 ${needsFertilize ? 'text-amber-600' : 'text-green-500'}`} />
            <span className={needsFertilize ? 'text-amber-700 font-semibold' : 'text-slate-600 text-xs'}>
              {needsFertilize ? 'Fertilize needed!' : 'Fertilizer OK'}
            </span>
          </div>
        )}

        {/* Repot Status */}
        {plant.repot_interval_months && (
          <div className={`flex items-center text-sm px-3 py-2 rounded-xl ${
            needsRepot ? 'bg-purple-50 border-2 border-purple-200' : 'bg-slate-50'
          }`}>
            <Calendar size={14} className={`mr-2 flex-shrink-0 ${needsRepot ? 'text-purple-600' : 'text-indigo-500'}`} />
            <span className={needsRepot ? 'text-purple-700 font-semibold' : 'text-slate-600 text-xs'}>
              {needsRepot ? 'Repot needed!' : 'Repot OK'}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {/* Water Button */}
        <button
          onClick={handleWater}
          className={`w-full py-2.5 rounded-xl font-bold transition-all duration-200 text-sm ${
            needsWater
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-200'
              : 'bg-slate-100 text-slate-400 cursor-default'
          }`}
          disabled={!needsWater}
        >
          <span className="flex items-center justify-center space-x-2">
            <Droplets className="w-4 h-4" />
            <span>{needsWater ? 'Water Now' : '✓ Watered'}</span>
          </span>
        </button>

        {/* Fertilize Button */}
        {plant.fertilize_interval_days && (
          <button
            onClick={handleFertilize}
            className={`w-full py-2.5 rounded-xl font-bold transition-all duration-200 text-sm ${
              needsFertilize
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-200'
                : 'bg-slate-100 text-slate-400 cursor-default'
            }`}
            disabled={!needsFertilize}
          >
            <span className="flex items-center justify-center space-x-2">
              <Sprout className="w-4 h-4" />
              <span>{needsFertilize ? 'Fertilize Now' : '✓ Fertilized'}</span>
            </span>
          </button>
        )}

        {/* Repot Button */}
        {plant.repot_interval_months && (
          <button
            onClick={handleRepot}
            className={`w-full py-2.5 rounded-xl font-bold transition-all duration-200 text-sm ${
              needsRepot
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg shadow-purple-200'
                : 'bg-slate-100 text-slate-400 cursor-default'
            }`}
            disabled={!needsRepot}
          >
            <span className="flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{needsRepot ? 'Repot Now' : '✓ Repotted'}</span>
            </span>
          </button>
        )}

        {/* Undo Button - Shows for 10 seconds after watering OR if recently watered */}
        {(showUndo || wasRecentlyWatered) && onUndo && (
          <button
            onClick={handleUndo}
            className="w-full py-2 rounded-xl font-semibold transition-all duration-200 bg-amber-50 text-amber-700 hover:bg-amber-100 border-2 border-amber-200 flex items-center justify-center space-x-2 text-sm"
          >
            <Undo2 className="w-4 h-4" />
            <span>Undo Watering</span>
          </button>
        )}
      </div>

      {/* Click for Details Hint */}
      <div className="mt-3 pt-3 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400 group-hover:text-emerald-600 transition-colors">
          Click for full details →
        </p>
      </div>
    </div>
  )
}