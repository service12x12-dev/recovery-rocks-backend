import validateDay from '@/mixins/PeriodicIssue/validateDay'
import validateMonth from '@/mixins/PeriodicIssue/validateMonth'
import type { Field, CompoundIndex, CollectionConfig } from 'payload'
import afterRead from '@/mixins/PeriodicIssue/afterRead'
import { RussianMonth } from '@/i18n/RussianMonth'

const fields = [
  {
    label: 'Ежегодная дата',
    name: 'annualDate',
    type: 'group',
    interfaceName: 'DateStruct',
    admin: {
      position: 'sidebar',
      description:
        'Каждый год в эту дату участник будет видеть эту публикацию, если для него нет публикации по достигнутым дням',
    },
    fields: [
      {
        label: 'День',
        name: 'day',
        type: 'number',
        min: 1,
        max: 31,
        validate: validateDay,
        index: true,
      },
      {
        label: 'Месяц',
        name: 'month',
        type: 'number',
        min: 0,
        max: 11,
        validate: validateMonth,
        index: true,
        admin: {
          components: {
            Cell: {
              path: '@/components/NumberSelectCell',
              clientProps: { numberLabelMap: RussianMonth },
            },
            Field: {
              path: '@/components/NumberSelectFieldClient',
              clientProps: { numberLabelMap: RussianMonth },
            },
          },
        },
      },
    ],
  },
  {
    label: 'Достигнуто дней',
    name: 'daysReached',
    type: 'number',
    index: true,
    unique: true,
    admin: {
      position: 'sidebar',
      description: 'От нуля и выше. В первый день чистоты достигнуто ноль дней.',
    },
  },
] satisfies Field[]

const indexes = [
  {
    fields: ['annualDate.day', 'annualDate.month'],
    unique: true,
  },
] satisfies CompoundIndex[]

const periodicIssueCollection = {
  fields,
  indexes,
  hooks: { afterRead: [afterRead] },
} satisfies Partial<CollectionConfig>

export default periodicIssueCollection
