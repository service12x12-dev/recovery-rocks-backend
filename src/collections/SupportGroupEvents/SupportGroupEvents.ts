import { CollectionConfig } from 'payload'
import { RussianDayOfTheWeek } from '@/i18n/RussianDayOfTheWeek'
import beforeChange from './beforeChange'

export const SupportGroupEvents = {
  labels: {
    plural: 'События групп поддержки',
    singular: 'Событие группы поддержки',
  },
  slug: 'supportGroupEvents',
  access: {
    read: () => true,
  },
  indexes: [
    {
      fields: ['supportGroup', 'day', 'start.hour', 'start.minute'],
      unique: true,
    },
  ],
  hooks: {
    beforeChange: [beforeChange],
  },
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
            path: '@/components/NumberSelect/NumberSelectCell',
            clientProps: { numberLabelMap: RussianDayOfTheWeek },
          },
          Field: {
            path: '@/components/NumberSelect/NumberSelectFieldClient',
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
    {
      label: 'Версия события (SEQUENCE в iCal)',
      name: 'sequence',
      type: 'number',
      defaultValue: 0,
      required: true,
      min: 0,
      admin: {
        step: 1,
        disabled: true,
      },
    },
  ],
} satisfies CollectionConfig<'supportGroupEvents'>
