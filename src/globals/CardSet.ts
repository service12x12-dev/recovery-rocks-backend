import { GlobalConfig } from 'payload'

export const CardSet = {
  slug: 'cardSet',
  label: 'Набор карточек',
  admin: {
    description: 'Эти карточки будут показаны пользователям в заданном порядке.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Карточки',
      name: 'cards',
      type: 'relationship',
      relationTo: 'cards',
      hasMany: true,
      admin: {
        appearance: 'drawer',
        isSortable: true,
        allowCreate: false,
        allowEdit: false,
      },
    },
  ],
} satisfies GlobalConfig<'cardSet'>
