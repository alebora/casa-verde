export interface PlantCareRecommendation {
    species: string
    commonNames: string[]
    waterIntervalDays: number
    fertilizeIntervalDays: number
    repotIntervalMonths: number
    lightRequirements: string
    difficulty: 'Easy' | 'Moderate' | 'Advanced'
  }
  
  export const PLANT_DATABASE: PlantCareRecommendation[] = [
    // Easy Plants
    {
      species: 'Monstera deliciosa',
      commonNames: ['Monstera', 'Swiss Cheese Plant', 'Split-leaf Philodendron'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 24,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Easy'
    },
    {
      species: 'Pothos aureus',
      commonNames: ['Pothos', 'Devil\'s Ivy', 'Golden Pothos'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Low to bright indirect light',
      difficulty: 'Easy'
    },
    {
      species: 'Sansevieria trifasciata',
      commonNames: ['Snake Plant', 'Mother-in-Law\'s Tongue', 'Sansevieria'],
      waterIntervalDays: 14,
      fertilizeIntervalDays: 60,
      repotIntervalMonths: 36,
      lightRequirements: 'Low to bright indirect light',
      difficulty: 'Easy'
    },
    {
      species: 'Chlorophytum comosum',
      commonNames: ['Spider Plant', 'Airplane Plant'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 12,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Easy'
    },
    {
      species: 'Zamioculcas zamiifolia',
      commonNames: ['ZZ Plant', 'Zanzibar Gem'],
      waterIntervalDays: 14,
      fertilizeIntervalDays: 60,
      repotIntervalMonths: 24,
      lightRequirements: 'Low to bright indirect light',
      difficulty: 'Easy'
    },
    {
      species: 'Dracaena marginata',
      commonNames: ['Dragon Tree', 'Madagascar Dragon Tree'],
      waterIntervalDays: 10,
      fertilizeIntervalDays: 45,
      repotIntervalMonths: 24,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Easy'
    },
    {
      species: 'Spathiphyllum wallisii',
      commonNames: ['Peace Lily', 'Spathiphyllum'],
      waterIntervalDays: 5,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Low to medium indirect light',
      difficulty: 'Easy'
    },
    
    // Moderate Plants
    {
      species: 'Ficus lyrata',
      commonNames: ['Fiddle Leaf Fig', 'Ficus'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Moderate'
    },
    {
      species: 'Philodendron hederaceum',
      commonNames: ['Heartleaf Philodendron', 'Philodendron'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Medium to bright indirect light',
      difficulty: 'Moderate'
    },
    {
      species: 'Calathea ornata',
      commonNames: ['Pinstripe Plant', 'Calathea'],
      waterIntervalDays: 5,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Medium indirect light',
      difficulty: 'Moderate'
    },
    {
      species: 'Maranta leuconeura',
      commonNames: ['Prayer Plant', 'Maranta'],
      waterIntervalDays: 5,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Medium indirect light',
      difficulty: 'Moderate'
    },
    {
      species: 'Alocasia amazonica',
      commonNames: ['Elephant Ear', 'African Mask Plant', 'Alocasia'],
      waterIntervalDays: 5,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Moderate'
    },
    {
      species: 'Anthurium andraeanum',
      commonNames: ['Flamingo Flower', 'Anthurium'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 24,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Moderate'
    },
    {
      species: 'Begonia rex',
      commonNames: ['Rex Begonia', 'Painted-Leaf Begonia'],
      waterIntervalDays: 5,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 12,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Moderate'
    },
    
    // Advanced Plants
    {
      species: 'Ficus elastica',
      commonNames: ['Rubber Plant', 'Rubber Tree'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 24,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Moderate'
    },
    {
      species: 'Stromanthe sanguinea',
      commonNames: ['Stromanthe', 'Triostar'],
      waterIntervalDays: 5,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Medium to bright indirect light',
      difficulty: 'Advanced'
    },
    
    // Succulents & Cacti
    {
      species: 'Aloe vera',
      commonNames: ['Aloe', 'Aloe Vera'],
      waterIntervalDays: 14,
      fertilizeIntervalDays: 60,
      repotIntervalMonths: 24,
      lightRequirements: 'Bright direct light',
      difficulty: 'Easy'
    },
    {
      species: 'Echeveria elegans',
      commonNames: ['Echeveria', 'Mexican Snowball'],
      waterIntervalDays: 14,
      fertilizeIntervalDays: 60,
      repotIntervalMonths: 24,
      lightRequirements: 'Bright direct light',
      difficulty: 'Easy'
    },
    {
      species: 'Crassula ovata',
      commonNames: ['Jade Plant', 'Money Tree'],
      waterIntervalDays: 14,
      fertilizeIntervalDays: 60,
      repotIntervalMonths: 24,
      lightRequirements: 'Bright direct light',
      difficulty: 'Easy'
    },
    {
      species: 'Schlumbergera bridgessii',
      commonNames: ['Christmas Cactus', 'Holiday Cactus'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 24,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Easy'
    },
    
    // Herbs
    {
      species: 'Mentha spicata',
      commonNames: ['Mint', 'Spearmint'],
      waterIntervalDays: 3,
      fertilizeIntervalDays: 21,
      repotIntervalMonths: 12,
      lightRequirements: 'Bright direct light',
      difficulty: 'Easy'
    },
    {
      species: 'Ocimum basilicum',
      commonNames: ['Basil', 'Sweet Basil'],
      waterIntervalDays: 3,
      fertilizeIntervalDays: 21,
      repotIntervalMonths: 6,
      lightRequirements: 'Bright direct light',
      difficulty: 'Easy'
    },
    {
      species: 'Rosmarinus officinalis',
      commonNames: ['Rosemary'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Bright direct light',
      difficulty: 'Moderate'
    },
    
    // Ferns
    {
      species: 'Nephrolepis exaltata',
      commonNames: ['Boston Fern', 'Sword Fern'],
      waterIntervalDays: 3,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 12,
      lightRequirements: 'Medium indirect light',
      difficulty: 'Moderate'
    },
    {
      species: 'Asplenium nidus',
      commonNames: ['Bird\'s Nest Fern', 'Asplenium'],
      waterIntervalDays: 5,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Medium indirect light',
      difficulty: 'Moderate'
    },
    
    // Other Popular Plants
    {
      species: 'Pilea peperomioides',
      commonNames: ['Chinese Money Plant', 'Pancake Plant', 'UFO Plant'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Easy'
    },
    {
      species: 'Tradescantia zebrina',
      commonNames: ['Wandering Jew', 'Inch Plant', 'Spiderwort'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 12,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Easy'
    },
    {
      species: 'Hoya carnosa',
      commonNames: ['Wax Plant', 'Hoya', 'Porcelain Flower'],
      waterIntervalDays: 10,
      fertilizeIntervalDays: 45,
      repotIntervalMonths: 24,
      lightRequirements: 'Bright indirect light',
      difficulty: 'Moderate'
    },
    {
      species: 'Peperomia obtusifolia',
      commonNames: ['Baby Rubber Plant', 'Peperomia'],
      waterIntervalDays: 7,
      fertilizeIntervalDays: 30,
      repotIntervalMonths: 18,
      lightRequirements: 'Medium to bright indirect light',
      difficulty: 'Easy'
    }
  ]
  
  export function searchPlants(query: string): PlantCareRecommendation[] {
    if (!query || query.length < 2) return []
    
    const lowerQuery = query.toLowerCase()
    
    return PLANT_DATABASE.filter(plant => {
      const speciesMatch = plant.species.toLowerCase().includes(lowerQuery)
      const commonNameMatch = plant.commonNames.some(name => 
        name.toLowerCase().includes(lowerQuery)
      )
      return speciesMatch || commonNameMatch
    }).slice(0, 8) // Limit to 8 results
  }
  
  export function getPlantRecommendation(species: string): PlantCareRecommendation | null {
    const lowerSpecies = species.toLowerCase()
    
    return PLANT_DATABASE.find(plant => {
      const speciesMatch = plant.species.toLowerCase() === lowerSpecies
      const commonNameMatch = plant.commonNames.some(name => 
        name.toLowerCase() === lowerSpecies
      )
      return speciesMatch || commonNameMatch
    }) || null
  }