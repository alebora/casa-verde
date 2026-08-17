import { supabase } from '@/lib/supabase'
import { Plant } from '@/types/plant'
import { careLogService } from './careLogService'

export const plantService = {
  async getAll(): Promise<Plant[]> {
    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Plant | null> {
    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(plant: Partial<Plant>): Promise<Plant> {
    // ← ADD: Get current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('plants')
      .insert({
        ...plant,
        user_id: user.id, // ← ADD THIS
        last_watered_at: plant.last_watered_at || new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Plant>): Promise<Plant> {
    const { data, error } = await supabase
      .from('plants')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('plants')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async water(id: string): Promise<Plant> {
    const now = new Date().toISOString()
    
    const plant = await this.update(id, {
      last_watered_at: now,
    })

    try {
      await careLogService.create({
        plant_id: id,
        care_type: 'water',
        notes: 'Watered from dashboard',
        performed_at: now,
      })
    } catch (error) {
      console.warn('Failed to create care log:', error)
    }

    return plant
  },

  async fertilize(id: string): Promise<Plant> {
    const now = new Date().toISOString()
    
    const plant = await this.update(id, {
      last_fertilized_at: now,
    })

    try {
      await careLogService.create({
        plant_id: id,
        care_type: 'fertilize',
        notes: 'Fertilized',
        performed_at: now,
      })
    } catch (error) {
      console.warn('Failed to create care log:', error)
    }

    return plant
  },

  async repot(id: string): Promise<Plant> {
    const now = new Date().toISOString()
    
    const plant = await this.update(id, {
      last_repotted_at: now,
    })

    try {
      await careLogService.create({
        plant_id: id,
        care_type: 'repot',
        notes: 'Repotted',
        performed_at: now,
      })
    } catch (error) {
      console.warn('Failed to create care log:', error)
    }

    return plant
  },
}