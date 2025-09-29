import { CollectionConfig } from 'payload'

export const Locations = {
  labels: {
    plural: 'Местоположения',
    singular: 'Местоположение',
  },
  slug: 'locations',
  access: {
    read: () => true,
  },
  indexes: [
    {
      fields: ['street', 'house'],
    },
    {
      fields: ['city', 'street', 'house'],
    },
  ],
  fields: [
    {
      label: 'Город',
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      hasMany: false,
      required: true,
    },
    {
      label: 'Улица',
      name: 'street',
      type: 'text',
      required: true,
      index: true,
      admin: {
        autoComplete: 'street-address',
        placeholder: 'Красный Проспект',
      },
    },
    {
      label: 'Дом',
      name: 'house',
      type: 'text',
      required: true,
      index: true,
      admin: {
        placeholder: '123/3',
      },
    },
    {
      label: 'Квартира или офис',
      name: 'apartmentOrOffice',
      type: 'text',
      index: true,
      admin: {
        placeholder: '703б',
      },
    },
    {
      label: 'Подъезд или вход',
      name: 'entrance',
      type: 'text',
      admin: {
        placeholder: 'Вход со двора',
      },
    },
    {
      label: 'Этаж',
      name: 'floor',
      type: 'text',
      admin: {
        placeholder: 'Подвал',
      },
    },
    {
      label: 'Код домофона',
      name: 'intercomCode',
      type: 'text',
      admin: {
        placeholder: '*123',
      },
    },
    {
      label: 'Комментарий',
      name: 'comment',
      type: 'text',
      admin: {
        placeholder: 'Злая собака берёт взятки сосисками',
      },
    },
    {
      label: 'Группы поддержки',
      name: 'supportGroups',
      type: 'join',
      collection: 'supportGroups',
      on: 'location',
      orderable: false,
      defaultLimit: 0,
      virtual: true,
    },
  ],
} satisfies CollectionConfig<'locations'>
