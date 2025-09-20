import { GlobalConfig } from 'payload'

export const FallbackPublications = {
  slug: 'fallbackPublications',
  label: 'Запасные публикации',
  admin: {
    description:
      'Эти публикации будут показаны пользователю в такой день, когда ни по достигнутым дням, ни по ежегодной дате в базе данных не будет найдено ни одной публикации.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Запасная цитата',
      name: 'quote',
      type: 'relationship',
      relationTo: 'quotes',
      hasMany: false,
      admin: {
        appearance: 'drawer',
      },
    },
    {
      label: 'Запасная тема',
      name: 'topic',
      type: 'relationship',
      relationTo: 'topics',
      hasMany: false,
      admin: {
        appearance: 'drawer',
      },
    },
  ],
} satisfies GlobalConfig<'fallbackPublications'>
