'use client'

import { ResultAsync } from 'neverthrow'

export type ContactData = {
  name: string
  email: string
  phone: string
  description: string
  photos: File[]
}

export const submitContact = (data: ContactData): ResultAsync<void, Error> => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('email', data.email)
  formData.append('phone', data.phone)
  formData.append('description', data.description)
  for (const photo of data.photos) {
    formData.append('photos', photo)
  }

  return ResultAsync.fromPromise(
    fetch('/api/contact/submit', { method: 'POST', body: formData }).then((res) => {
      if (res.status === 500) throw new Error('Server error')
    }),
    (e) => (e instanceof Error ? e : new Error(String(e)))
  )
}
