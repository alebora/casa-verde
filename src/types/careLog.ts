export interface CareLog {
    id: string
    plant_id: string
    care_type: 'water' | 'fertilize' | 'repot' | 'prune' | 'other'
    notes?: string
    performed_at: string
    created_at?: string
  }
  
  export type CareLogFormData = Omit<CareLog, 'id' | 'created_at'>