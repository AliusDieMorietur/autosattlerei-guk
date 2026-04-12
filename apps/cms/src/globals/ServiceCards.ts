import type { GlobalConfig } from 'payload'

export const ServiceCardsGlobal: GlobalConfig = {
  slug: 'service-cards',
  access: { read: () => true },
  fields: [
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            description: 'Used for gallery link: /gallery/{slug}',
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
