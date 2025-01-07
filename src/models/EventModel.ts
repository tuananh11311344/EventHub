export interface EventModel {
  _id?: string
  title: string;
  photoUrl: string;
  description: string;
  titleAddress: string;
  location:Location;
  users: string[]; 
  authorId: string;
  category: string;
  startAt: number;
  endAt: number;
  date: number;
  price: string;
}

  
  export interface Location {
    address: string;
    lat: number;
    long: number;
  }
  