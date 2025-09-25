import { CollectionConfig } from 'payload'
import { colorPickerField } from '@innovixx/payload-color-picker-field'

export const Cards = {
  labels: {
    plural: 'Карточки',
    singular: 'Карточка',
  },
  slug: 'cards',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      label: 'Заголовок',
      name: 'title',
      type: 'text',
      required: true,
    },
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
      type: 'row',
      fields: [
        colorPickerField({
          name: 'backgroundColor',
          label: 'Цвет фона',
          required: true,
        }),
        colorPickerField({
          name: 'textColor',
          label: 'Цвет текста',
          required: true,
        }),
        colorPickerField({
          name: 'borderColor',
          label: 'Цвет рамки',
          required: true,
          admin: {
            description: 'Если рамка не нужна, скопируйте сюда цвет фона',
          },
        }),
      ],
    },
  ],
} satisfies CollectionConfig<'topics'>
