import { useEffect, useState } from "react";
import type { Genre, Game } from "../types/Game";
import { createGame, getGenres, updateGame } from "../api/gameAPI";

interface Props {
  selectedGame?: Game | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const GameForm = ({ selectedGame, onCancel, onSuccess }: Props) => {
  const [game, setGame] = useState<Game>({
    name: "",
    genreId: 0,   // ✅ use genreId (NOT genre)
    price: 0,
    releaseDate: "",
  });

  const [genres, setGenres] = useState<Genre[]>([]);

  // ✅ Load genres
  const loadGenres = async () => {
    const res = await getGenres();
    setGenres(res.data);
  };

  // ✅ Handle edit + genre mapping
  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
    if (selectedGame && genres.length > 0) {
      const matchedGenre = genres.find(
        (g) => g.name === selectedGame.genre
      );

      setGame({
        id: selectedGame.id,
        name: selectedGame.name,
        price: selectedGame.price,
        releaseDate: selectedGame.releaseDate,
        genreId: matchedGenre ? matchedGenre.id : 0, // ✅ map name → id
      });
    }
  }, [selectedGame, genres]);

  // ✅ Handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setGame({
      ...game,
      [name]:
        name === "genreId" || name === "price"
          ? Number(value) // ✅ convert to number
          : value,
    });
  };

  // ✅ Submit (send correct payload)
  const handleSubmit = async () => {
    const payload = {
      name: game.name,
      genreId: game.genreId,
      price: game.price,
      releaseDate: game.releaseDate,
    };

    console.log("Sending:", payload); // 🔍 debug

    try {
      if (selectedGame?.id) {
        await updateGame(selectedGame.id, payload);
      } else {
        await createGame(payload);
      }

      onSuccess();
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  return (
    <div className="form-container">
      <h2>{selectedGame ? "Edit Game" : "New Game"}</h2>

      <input
        name="name"
        placeholder="Name"
        value={game.name}
        onChange={handleChange}
      />

      <select
        name="genreId"
        value={game.genreId}
        onChange={handleChange}
      >
        <option value="">Select Genre</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="price"
        value={game.price}
        onChange={handleChange}
      />

      <input
        type="date"
        name="releaseDate"
        value={game.releaseDate}
        onChange={handleChange}
      />

      <div>
        <button className="btn-primary" onClick={handleSubmit}>
          Save
        </button>
        <button className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GameForm;