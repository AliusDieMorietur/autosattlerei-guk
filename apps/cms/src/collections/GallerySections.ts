import type { CollectionConfig } from 'payload'

export const GallerySections: CollectionConfig = {
  slug: 'gallery-sections',
  access: { read: () => true },
  admin: {
    defaultColumns: ['title', 'slug', 'order'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL identifier, e.g. "wheel", "door-panel", "salon"' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Order on the gallery landing page' },
    },
    {
      name: 'images',
      type: 'array',
      fields: [
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
