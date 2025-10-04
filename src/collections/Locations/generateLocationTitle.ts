import compact from '@/util/compact'

export type LocationParams = {
  city: string
  street: string
  house: string
  apartmentOrOffice?: string | null
}

export default function generateLocationTitle(params: LocationParams) {
  const { city, street, house, apartmentOrOffice } = params

  return [...compact([`${street} ${house}`, apartmentOrOffice, city])].join(', ')
}
