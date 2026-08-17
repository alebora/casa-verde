import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { plantService } from '@/services/plantService'
import { ArrowLeft, Loader2, Sprout, Droplets, Calendar, Sparkles, Info } from 'lucide-react'
import { searchPlants, getPlantRecommendation, PlantCareRecommendation } from '@/utils/plantDatabase'
import toast from 'react-hot-toast'

export function AddPlant() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<PlantCareRecommendation[]>([])
  const [selectedRecommendation, setSelectedRecommendation] = useState<PlantCareRecommendation | null>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState({
    nickname: '',
    species: '',
    variety: '',
    location: '',
    water_interval_days: 7,
    fertilize_interval_days: 30,
    repot_interval_months: 12,
    notes: '',
  })

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await plantService.create({
        ...formData,
        last_watered_at: new Date().toISOString(),
      })
      toast.success('Plant added successfully! 🌱')
      navigate('/')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add plant'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, species: value }))
    
    if (value.length >= 2) {
      const results = searchPlants(value)
      setSuggestions(results)
      setShowSuggestions(results.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
    
    // Clear recommendation if species changed
    if (selectedRecommendation && value !== selectedRecommendation.species) {
      setSelectedRecommendation(null)
    }
  }

  const handleSelectSuggestion = (plant: PlantCareRecommendation) => {
    setFormData((prev) => ({
      ...prev,
      species: plant.species,
      water_interval_days: plant.waterIntervalDays,
      fertilize_interval_days: plant.fertilizeIntervalDays,
      repot_interval_months: plant.repotIntervalMonths,
    }))
    setSelectedRecommendation(plant)
    setShowSuggestions(false)
    
    toast.success(`Care schedule set for ${plant.species}! ✨`, {
      duration: 4000,
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-8 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Dashboard</span>
      </button>

      {/* Main Card */}
      <div className="glass-card">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-4">
            <Sprout className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Add New Plant
          </h1>
          <p className="text-slate-600">
            Let's get your new plant friend set up for success!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold">1</span>
              <span>Basic Information</span>
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nickname *
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="e.g., Monty the Monstera"
                className="input"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative" ref={suggestionsRef}>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                  <span>Species *</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </label>
                <input
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={handleSpeciesChange}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true)
                  }}
                  placeholder="Start typing... (e.g., Monstera)"
                  className="input"
                  required
                  autoComplete="off"
                />
                
                {/* Autocomplete Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-2 border-emerald-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                    {suggestions.map((plant, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelectSuggestion(plant)}
                        className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-colors border-b border-slate-100 last:border-0"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800 mb-1">
                              {plant.species}
                            </p>
                            <p className="text-xs text-slate-500 mb-2">
                              {plant.commonNames.join(', ')}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-slate-600">
                              <span className="flex items-center space-x-1">
                                <Droplets className="w-3 h-3 text-blue-500" />
                                <span>{plant.waterIntervalDays}d</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Sprout className="w-3 h-3 text-green-500" />
                                <span>{plant.fertilizeIntervalDays}d</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-purple-500" />
                                <span>{plant.repotIntervalMonths}mo</span>
                              </span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                            plant.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            plant.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {plant.difficulty}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Variety (optional)
                </label>
                <input
                  type="text"
                  name="variety"
                  value={formData.variety}
                  onChange={handleChange}
                  placeholder="e.g., Thai Constellation"
                  className="input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Location (optional)
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Living room, Window sill"
                className="input"
              />
            </div>

            {/* Care Recommendation Info */}
            {selectedRecommendation && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-emerald-900 mb-2">
                      Recommended Care Schedule Applied ✨
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-emerald-700 font-medium">💡 Light</p>
                        <p className="text-emerald-600">{selectedRecommendation.lightRequirements}</p>
                      </div>
                      <div>
                        <p className="text-emerald-700 font-medium">📊 Difficulty</p>
                        <p className="text-emerald-600">{selectedRecommendation.difficulty}</p>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-600 mt-3">
                      Care intervals have been automatically set based on this plant's needs. You can adjust them below if needed.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Care Schedule */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
              <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold">2</span>
              <span>Care Schedule</span>
              {selectedRecommendation && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                  Auto-filled
                </span>
              )}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>Water every (days) *</span>
                </label>
                <input
                  type="number"
                  name="water_interval_days"
                  value={formData.water_interval_days}
                  onChange={handleChange}
                  min="1"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                  <Sprout className="w-4 h-4 text-green-500" />
                  <span>Fertilize every (days)</span>
                </label>
                <input
                  type="number"
                  name="fertilize_interval_days"
                  value={formData.fertilize_interval_days}
                  onChange={handleChange}
                  min="1"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>Repot every (months)</span>
                </label>
                <input
                  type="number"
                  name="repot_interval_months"
                  value={formData.repot_interval_months}
                  onChange={handleChange}
                  min="1"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
              <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold">3</span>
              <span>Additional Notes</span>
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special care instructions or observations..."
                className="input min-h-[120px] resize-none"
                rows={4}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Sprout className="w-5 h-5" />
                  <span>Add Plant</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}