export interface Game {
  id?: number;
  name: string;

  genre?: string;   
  genreId?: number; 
  price: number;
  releaseDate: string;
}
export interface Genre{
    id:number;
    name:string;
}