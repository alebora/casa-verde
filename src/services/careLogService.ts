import { supabase } from '@/lib/supabase'
import { CareLog, CareLogFormData } from '@/types/careLog'

export const careLogService = {
  async getByPlantId(plantId: string): Promise<CareLog[]> {
    try {
      const { data, error } = await supabase
        .from('care_logs')
        .select('*')
        .eq('plant_id', plantId)
        .order('performed_at', { ascending: false })

      if (error) {
        console.error('Error fetching care logs:', error)
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error('Failed to get care logs:', error)
      // Return empty array if table doesn't exist yet
      return []
    }
  },

  async create(log: CareLogFormData): Promise<CareLog | null> {
    try {
      const { data, error } = await supabase
        .from('care_logs')
        .insert(log)
        .select()
        .single()

      if (error) {
        console.error('Error creating care log:', error)
        throw error
      }
      
      return data
    } catch (error) {
      console.error('Failed to create care log:', error)
      // Return null if table doesn't exist - app will still work
      return null
    }
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('care_logs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting care log:', error)
      throw error
    }
  },
}