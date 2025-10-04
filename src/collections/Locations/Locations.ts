import { CollectionConfig, TextFieldSingleValidation } from 'payload'
import { text } from 'payload/shared'
import beforeChangeTitle from './beforeChangeTitle'

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
  admin: {
    description: 'Заголовок будет автоматически заполнен адресом места, если оставить его пустым',
    defaultColumns: ['city', 'street', 'house', 'apartmentOrOffice'],
    useAsTitle: 'title',
  },
  fields: [
    {
      label: 'Заголовок',
      name: 'title',
      type: 'text',
      required: true,

      hooks: {
        beforeValidate: [
          (args) => {
            const { value } = args
            return value ? value : null
          },
        ],
        beforeChange: [beforeChangeTitle],
      },

      validate: ((value, options) => {
        return text(value, { ...options, required: false })
      }) satisfies TextFieldSingleValidation,
    },
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
