import { CollectionConfig } from 'payload'
import periodicIssueCollection from '@/mixins/PeriodicIssue/periodicIssueCollection'

export const Quotes = {
  labels: {
    plural: 'Цитаты',
    singular: 'Цитата',
  },
  slug: 'quotes',
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Содержание',
      name: 'body',
      type: 'textarea',
      required: true,
      admin: {
        rows: 10,
      },
    },
    {
      label: 'Источник',
      name: 'source',
      type: 'textarea',
      required: true,
      admin: {
        rows: 2,
      },
    },
    ...periodicIssueCollection.fields,
  ],
  indexes: [...periodicIssueCollection.indexes],
  hooks: {
    afterRead: [...periodicIssueCollection.hooks.afterRead],
  },
} satisfies CollectionConfig<'quotes'>
