import { CollectionConfig } from 'payload'
import validatePhoneNumber from '@/collections/Cities/validatePhoneNumber'
import beforeChangePhoneNumber from '@/collections/Cities/beforeChangePhoneNumber'
import { rawTimeZones } from '@vvo/tzdb'
import validateTimezone from '@/collections/Cities/validateTimezone'

const stringSelectOptions = rawTimeZones.map((_) => ({ label: _.rawFormat, value: _.name }))

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
      unique: true,
      required: true,
    },
    {
      label: 'Часовой пояс',
      name: 'timezone',
      type: 'text',
      hasMany: false,
      index: true,
      required: true,
      validate: validateTimezone,
      defaultValue: 'Europe/Moscow',
      admin: {
        components: {
          Field: {
            path: '@/components/StringSelect/StringSelectFieldClient',
            clientProps: { stringSelectOptions },
          },
        },
      },
    },
    {
      label: 'Номер телефона',
      name: 'phoneNumber',
      type: 'text',
      required: true,
      validate: validatePhoneNumber,
      hooks: {
        beforeChange: [beforeChangePhoneNumber],
      },
    },
    {
      label: 'Описание номера телефона',
      name: 'phoneNumberDescription',
      type: 'text',
      required: true,
      defaultValue: 'Горячая линия',
    },
    {
      label: 'Группы поддержки',
      name: 'supportGroups',
      type: 'join',
      collection: 'supportGroups',
      on: 'city',
      orderable: true,
      defaultLimit: 0,
      virtual: true,
    },
  ],
} satisfies CollectionConfig<'cities'>
