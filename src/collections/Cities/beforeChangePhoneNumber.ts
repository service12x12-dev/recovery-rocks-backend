import { FieldHook } from 'payload'
import { City } from '@/payload-types'
import { parsePhoneNumberWithError } from 'libphonenumber-js'

const beforeChangePhoneNumber: FieldHook<City, string, City> = (params) => {
  const { value } = params

  if (value === undefined) {
    throw new Error('Phone number is required')
  }

  const phoneNumber = parsePhoneNumberWithError(value, 'RU')
  return phoneNumber.number
}

export default beforeChangePhoneNumber
