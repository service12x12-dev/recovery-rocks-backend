import { CollectionConfig } from 'payload'
import periodicIssueCollection from '@/mixins/PeriodicIssue/periodicIssueCollection'

export const Topics = {
  labels: {
    plural: 'Темы',
    singular: 'Тема',
  },
  slug: 'topics',
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
    ...periodicIssueCollection.fields,
  ],
  indexes: [...periodicIssueCollection.indexes],
  hooks: {
    afterRead: [...periodicIssueCollection.hooks.afterRead],
  },
} satisfies CollectionConfig<'topics'>
