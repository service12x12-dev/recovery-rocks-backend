import { NumberField, Validate, ValidateOptions } from 'payload'
import { number as validateNumber } from 'payload/shared'
import { PeriodicIssue } from '@/mixins/PeriodicIssue/PeriodicIssue'
import daysInMonth from '@/util/daysInMonth'
import { Month } from '@/util/Month'

const validateDay: Validate<number, PeriodicIssue, PeriodicIssue['annualDate'], NumberField> = (
  day,
  options,
) => {
  const { month } = options.siblingData ?? {}
  if (typeof day === 'number') {
    if (day <= 0) {
      return 'День не может быть отрицательным или нулевым'
    } else if (typeof month !== 'number') {
      return 'День нельзя указать без месяца'
    } else if (month >= 0 && month <= 11 && day > daysInMonth[month as Month]) {
      return 'В указанном месяце нет столько дней'
    }
  } else if (typeof month === 'number') {
    return 'Если указан месяц, то нужно указать и день'
  }
  return validateNumber(day, options as ValidateOptions<unknown, unknown, NumberField, number>)
}

export default validateDay
