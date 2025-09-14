import { NumberField, Validate, ValidateOptions } from 'payload'
import { number as validateNumber } from 'payload/shared'
import { PeriodicIssue } from '@/mixins/PeriodicIssue/PeriodicIssue'

const validateMonth: Validate<number, PeriodicIssue, PeriodicIssue['annualDate'], NumberField> = (
  month,
  options,
) => {
  const { day } = options.siblingData ?? {}
  if (typeof month === 'number') {
    if (typeof day !== 'number') {
      return 'Месяц нельзя указать без дня'
    }
  } else {
    if (typeof day === 'number') {
      return 'Если указан день, то нужно указать и месяц'
    }
  }
  return validateNumber(month, options as ValidateOptions<unknown, unknown, NumberField, number>)
}

export default validateMonth
