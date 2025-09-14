import { NumberField, Validate, ValidateOptions } from 'payload'
import { number as validateNumber } from 'payload/shared'
import { PeriodicIssue } from '@/mixins/PeriodicIssue/PeriodicIssue'

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

// fixme move out. share between backend and frontend
enum Month {
  January = 0,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

// fixme move out. share between backend and frontend
const daysInMonth = Object.freeze(
  createDictionary({
    [Month.January]: 31,
    [Month.February]: 29,
    [Month.March]: 31,
    [Month.April]: 30,
    [Month.May]: 31,
    [Month.June]: 30,
    [Month.July]: 31,
    [Month.August]: 31,
    [Month.September]: 30,
    [Month.October]: 31,
    [Month.November]: 30,
    [Month.December]: 31,
  } as const),
)

// fixme move out. share between backend and frontend
function createDictionary<T extends object>(_: T): { -readonly [P in keyof T]: T[P] } {
  const base = Object.create(null) as object
  for (const ownKey of Reflect.ownKeys(_)) {
    const value = Reflect.get(_, ownKey)
    Reflect.set(base, ownKey, value)
  }
  return base as { [P in keyof T]: T[P] }
}
