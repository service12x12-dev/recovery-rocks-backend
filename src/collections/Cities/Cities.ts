import { CollectionConfig } from 'payload'
import validatePhoneNumber from '@/collections/Cities/validatePhoneNumber'

export const Cities = {
  labels: {
    plural: 'Города',
    singular: 'Город',
  },
  slug: 'cities',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      label: 'Название',
      name: 'name',
      type: 'text',
      index: true,
      required: true,
    },
    {
      label: 'Номер телефона',
      name: 'phoneNumber',
      type: 'text',
      required: true,
      validate: validatePhoneNumber,
    },
    {
      label: 'Описание номера телефона',
      name: 'phoneNumberDescription',
      type: 'text',
      required: true,
      defaultValue: 'Горячая линия',
    },
  ],
} satisfies CollectionConfig<'cities'>
