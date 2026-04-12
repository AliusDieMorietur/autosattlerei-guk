import type { CollectionConfig } from 'payload'

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  access: { read: () => true },
  admin: {
    defaultColumns: ['category', 'group', 'isPreview', 'order'],
  },
  fields: [
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Wheel', value: 'wheel' },
        { label: 'Door Panel', value: 'door-panel' },
        { label: 'Salon', value: 'salon' },
      ],
    },
    {
      name: 'group',
      type: 'text',
      admin: { description: 'For salon sub-groups: "1", "2", ... "7"' },
    },
    {
      name: 'groupOrder',
      type: 'number',
      admin: { description: 'For ordering salon groups' },
    },
    {
      name: 'isPreview',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show in gallery landing page slider' },
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
