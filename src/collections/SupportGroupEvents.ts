import { CollectionConfig } from 'payload'
import { RussianDayOfTheWeek } from '@/i18n/RussianDayOfTheWeek'

export const SupportGroupEvents = {
  labels: {
    plural: 'События групп поддержки',
    singular: 'Событие группы поддержки',
  },
  slug: 'supportGroupEvents',
  access: {
    read: () => true,
  },
  admin: {
    hidden: true,
  },
  indexes: [
    {
      fields: ['supportGroup', 'day', 'start.hour', 'start.minute'],
      unique: true,
    },
  ],
  fields: [
    {
      label: 'Группа поддержки',
      name: 'supportGroup',
      type: 'relationship',
      relationTo: 'supportGroups',
      hasMany: false,
      required: true,
      admin: {
        allowEdit: false,
      },
    },
    {
      label: 'День недели',
      name: 'day',
      type: 'number',
      required: true,
      min: 0,
      max: 6,
      admin: {
        components: {
          Cell: {
            path: '@/components/NumberSelectCell',
            clientProps: { numberLabelMap: RussianDayOfTheWeek },
          },
          Field: {
            path: '@/components/NumberSelectFieldClient',
            clientProps: { numberLabelMap: RussianDayOfTheWeek },
          },
        },
      },
    },
    {
      label: 'Время начала',
      name: 'start',
      type: 'group',
      interfaceName: 'TimeStruct',
      required: true,
      fields: [
        {
          type: 'row',
          fields: [
            {
              label: 'Час',
              name: 'hour',
              type: 'number',
              required: true,
              min: 0,
              max: 23,
              admin: {
                step: 1,
                placeholder: '20',
              },
            },
            {
              label: 'Минута',
              name: 'minute',
              type: 'number',
              required: true,
              min: 0,
              max: 59,
              admin: {
                step: 1,
                placeholder: '50',
              },
            },
          ],
        },
      ],
    },
    {
      label: 'Длительность в минутах',
      name: 'duration',
      type: 'number',
      required: true,
      defaultValue: 30,
      min: 0,
      admin: {
        step: 1,
        placeholder: '30',
      },
    },
  ],
} satisfies CollectionConfig<'supportGroupEvents'>
