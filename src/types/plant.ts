export interface Plant {
    id: string;
    user_id?: string;
    nickname: string;
    species: string;
    variety?: string;
    location?: string;
    water_interval_days: number;
    fertilize_interval_days?: number;
    repot_interval_months?: number;
    last_watered_at: string;
    last_fertilized_at?: string;
    last_repotted_at?: string;
    purchase_date?: string;
    notes?: string;
    photo_url?: string;
    created_at: string;
    updated_at: string;
  }
  
  export type PlantFormData = Omit<Plant, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
  
  export interface CareAction {
    type: 'water' | 'fertilize' | 'repot' | 'prune' | 'other';
    label: string;
    icon: string;
  }