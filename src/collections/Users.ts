import type { CollectionConfig } from 'payload'

export const Users = {
  slug: 'users',
  labels: {
    plural: 'Пользователи',
    singular: 'Пользователь',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
} satisfies CollectionConfig
