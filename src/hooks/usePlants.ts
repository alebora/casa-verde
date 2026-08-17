import { useState, useEffect } from 'react'
import { Plant } from '@/types/plant'
import { plantService } from '@/services/plantService'
import { careLogService } from '@/services/careLogService'
import toast from 'react-hot-toast'

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlants = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await plantService.getAll()
      setPlants(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch plants'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const waterPlant = async (id: string) => {
    try {
      await plantService.water(id)
      toast.success('Plant watered! 💧')
      await fetchPlants()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to water plant'
      toast.error(message)
    }
  }

  const undoWatering = async (id: string) => {
    try {
      // Get the plant's care logs
      const careLogs = await careLogService.getByPlantId(id)
      const waterLogs = careLogs
        .filter(log => log.care_type === 'water')
        .sort((a, b) => new Date(b.performed_at).getTime() - new Date(a.performed_at).getTime())

      if (waterLogs.length === 0) {
        toast.error('No watering history found')
        return
      }

      const lastWaterLog = waterLogs[0]
      const previousWaterLog = waterLogs[1]

      // Get the plant to calculate fallback date
      const plant = plants.find(p => p.id === id)
      if (!plant) {
        toast.error('Plant not found')
        return
      }

      // Update plant's last_watered_at to previous log OR interval days ago
      const previousDate = previousWaterLog 
        ? previousWaterLog.performed_at 
        : new Date(Date.now() - plant.water_interval_days * 24 * 60 * 60 * 1000).toISOString()

      await plantService.update(id, {
        last_watered_at: previousDate
      })

      // Delete the most recent water log
      await careLogService.delete(lastWaterLog.id)

      toast.success('Watering undone! ♻️')
      await fetchPlants()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to undo watering'
      toast.error(message)
      console.error('Undo error:', err)
    }
  }

  const fertilizePlant = async (id: string) => {
    try {
      await plantService.fertilize(id)
      toast.success('Plant fertilized! 🌱')
      await fetchPlants()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fertilize plant'
      toast.error(message)
    }
  }

  const repotPlant = async (id: string) => {
    try {
      await plantService.repot(id)
      toast.success('Plant repotted! 🪴')
      await fetchPlants()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to repot plant'
      toast.error(message)
    }
  }

  const deletePlant = async (id: string) => {
    try {
      await plantService.delete(id)
      toast.success('Plant removed')
      await fetchPlants()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete plant'
      toast.error(message)
    }
  }

  useEffect(() => {
    fetchPlants()
  }, [])

  return {
    plants,
    loading,
    error,
    waterPlant,
    undoWatering,
    fertilizePlant,
    repotPlant,
    deletePlant,
    refreshPlants: fetchPlants,
  }
}