import { FieldHook } from 'payload'
import { Location } from '@/payload-types'
import generateLocationTitle from '@/collections/Locations/generateLocationTitle'

const beforeChangeTitle: FieldHook<Location, string, Location> = async (params) => {
  const { value, data, req } = params
  const { city: _cityId, street, house, apartmentOrOffice } = data ?? {}

  if (_cityId === undefined) {
    throw new Error('City is a required field')
  }

  const cityId = typeof _cityId === 'number' ? _cityId : _cityId.id

  if (!street) {
    throw new Error('Street is a required field')
  }

  if (!house) {
    throw new Error('House is a required field')
  }

  if (!value) {
    const city = await req.payload.findByID({ collection: 'cities', id: cityId })
    return generateLocationTitle({
      city: city.name,
      street,
      house,
      apartmentOrOffice,
    })
  }

  return value
}

export default beforeChangeTitle
