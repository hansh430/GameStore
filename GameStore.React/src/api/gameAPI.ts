import axios from "axios";
import type { Game } from "../types/Game";

const API = "/api"; // because of proxy

export const getGames = () => axios.get(`${API}/games`);
export const getGame = (id: number) => axios.get(`${API}/games/${id}`);
export const createGame = (game: Game) => axios.post(`${API}/games`, game);
export const updateGame = (id: number, game: Game) =>
  axios.put(`${API}/games/${id}`, game);
export const deleteGame = (id: number) =>
  axios.delete(`${API}/games/${id}`);

export const getGenres = () => axios.get(`${API}/genres`);