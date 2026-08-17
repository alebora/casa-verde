import { addDays, addMonths, isPast, formatDistanceToNow } from 'date-fns'

export function getNextWaterDate(lastWatered: string, intervalDays: number): Date {
  return addDays(new Date(lastWatered), intervalDays)
}

export function getNextFertilizeDate(lastFertilized: string, intervalDays: number): Date {
  return addDays(new Date(lastFertilized), intervalDays)
}

export function getNextRepotDate(lastRepotted: string, intervalMonths: number): Date {
  return addMonths(new Date(lastRepotted), intervalMonths)
}

export function isOverdue(nextDate: Date): boolean {
  return isPast(nextDate)
}

export function getTimeAgo(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getDaysUntil(date: Date): number {
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}