import type { GlobalConfig } from 'payload'

export const SlidesGlobal: GlobalConfig = {
  slug: 'slides',
  access: { read: () => true },
  fields: [
    {
      name: 'slides',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
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
