export interface PeriodicIssue {
  id: number // required for hook type
  annualDate?: {
    day?: number | null
    month?: number | null
  }
}
