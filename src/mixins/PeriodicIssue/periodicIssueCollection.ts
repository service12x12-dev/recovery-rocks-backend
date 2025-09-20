import validateDay from '@/mixins/PeriodicIssue/validateDay'
import validateMonth from '@/mixins/PeriodicIssue/validateMonth'
import type { Field, CompoundIndex, CollectionConfig } from 'payload'
import afterRead from '@/mixins/PeriodicIssue/afterRead'

const fields = [
  {
    type: 'row',
    fields: [
      {
        label: 'Ежегодная дата',
        name: 'annualDate',
        type: 'group',
        interfaceName: 'DateStruct',
        fields: [
          {
            type: 'row',
            fields: [
              {
                label: 'День',
                name: 'day',
                type: 'number',
                min: 1,
                max: 31,
                validate: validateDay,
                index: true,
                admin: {
                  description: 'День месяца. От единицы и выше.',
                },
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
                  description: '0 — Январь, 1 — Февраль, …, 11 — Декабрь',
                },
              },
            ],
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
          description: 'От нуля и выше. В первый день чистоты достигнуто ноль дней.',
        },
      },
    ],
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
