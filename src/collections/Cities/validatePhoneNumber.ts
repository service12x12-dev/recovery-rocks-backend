import { TextField, Validate } from 'payload'
import { text as validateText } from 'payload/shared'
import { City } from '@/payload-types'
import { isValidPhoneNumber } from 'libphonenumber-js/max'

const validatePhoneNumber: Validate<string, City, City, TextField> = (phoneNumber, options) => {
  if (!phoneNumber) {
    return 'Номер телефона обязателен'
  }
  try {
    if (!isValidPhoneNumber(phoneNumber, 'RU')) {
      return 'Невозможно распознать номер телефона. Попробуйте другой формат.'
    }
  } catch (raw) {
    return raw instanceof Error ? raw.message : 'Неизвестная ошибка'
  }
  return validateText(phoneNumber, options)
}

export default validatePhoneNumber
