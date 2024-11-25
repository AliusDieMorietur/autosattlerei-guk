export type ContactPhoto = {
  base64: string;
  width: number;
  height: number;
};

export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  photos: ContactPhoto[];
  createdAt: string;
};

export type ContactList = {
  items: Contact[];
  total: number;
};
