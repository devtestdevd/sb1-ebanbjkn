export interface Comment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface DogBreed {
  name: string;
  description: string;
  imageUrl: string;
  traits: string[];
}