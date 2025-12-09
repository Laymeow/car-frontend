export interface Owner {
  id: number;
  firstName: string | null;
  lastName: string | null;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  color: string;
  regNum: string;
  dateOfCreation?: string;
  price: number;
  owner?: Owner | null;
}

export interface CarFormData {
  brand: string;
  model: string;
  color: string;
  regNum: string;
  price: number;
  owner?: Owner | null; 
}

export interface CarFormDataWithOwnerId {
  brand: string;
  model: string;
  color: string;
  regNum: string;
  price: number;
  ownerId?: number | null;
}

export type CarEntry = CarFormData;