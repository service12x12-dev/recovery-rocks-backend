import { CollectionConfig } from 'payload'

export const SupportGroups = {
  labels: {
    plural: 'Группы поддержки',
    singular: 'Группа поддержки',
  },
  slug: 'supportGroups',
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
      required: true,
      index: true,
    },
    {
      label: 'Местоположение',
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: false,
      required: true,
      admin: {
        appearance: 'drawer',
        allowEdit: false,
      },
    },
    {
      label: 'Город',
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      hasMany: false,
      admin: {
        disabled: true,
        hidden: true,
      },
      virtual: 'location.city',
    },
    {
      label: 'События',
      name: 'events',
      type: 'join',
      collection: 'supportGroupEvents',
      on: 'supportGroup',
      orderable: false,
      defaultLimit: 0,
      defaultSort: ['day', 'start.hour', 'start.minute'],
      virtual: true,
      admin: {
        defaultColumns: ['day', 'start.hour', 'start.minute', 'duration'],
        allowCreate: true,
      },
    },
  ],
} satisfies CollectionConfig<'supportGroups'>
