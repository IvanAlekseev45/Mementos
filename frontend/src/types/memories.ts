export interface Memory {
  _id: string;
  image?: string;
  title: string;
  description: string;
  location: string;
  date: string;
}

export interface CreatePhoto {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
}
