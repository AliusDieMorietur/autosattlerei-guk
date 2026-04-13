import type { CollectionConfig } from 'payload'

export const Slides: CollectionConfig = {
  slug: 'slides',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'order'],
    useAsTitle: 'title',
  },
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
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
