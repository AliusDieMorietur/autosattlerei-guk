import type { CollectionConfig } from 'payload'

export const ServiceCards: CollectionConfig = {
  slug: 'service-cards',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'order'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
