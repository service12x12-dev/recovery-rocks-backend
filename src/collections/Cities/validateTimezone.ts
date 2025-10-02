import { TextField, Validate } from 'payload'
import { text as validateText } from 'payload/shared'
import { City } from '@/payload-types'
import { timeZonesNames } from '@vvo/tzdb'

const validateTimezone: Validate<string, City, City, TextField> = (timezone, options) => {
  if (!timezone) {
    return 'Часовой пояс обязателен'
  }
  if (!TIMEZONES.has(timezone)) {
    return 'Невозможно распознать часовой пояс. Попробуйте другой формат.'
  }
  return validateText(timezone, options)
}

export default validateTimezone

const TIMEZONES = new Set(timeZonesNames)
