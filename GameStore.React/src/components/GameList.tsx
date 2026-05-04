import { useEffect, useState } from "react";
import type { Game } from "../types/Game";
import { deleteGame, getGames } from "../api/gameAPI";

interface Props {
  onEdit: (game: Game) => void;
  onCreate: () => void;
}

const GameList = ({ onEdit, onCreate }: Props) => {
  const [games, setGames] = useState<Game[]>([]);

  const loadGames = async () => {
    const res = await getGames();
    setGames(res.data);
  };

  useEffect(() => {
    loadGames();
  }, []);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    await deleteGame(id);
    loadGames();
  };

  return (
    <div className="container">
      <button className="btn-primary" onClick={onCreate}>
        New Game
      </button>

      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Release Date</th>
                <th></th>
            </tr>
        </thead>

          <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.name}</td>
              <td>{game.genre}</td>
              <td>${game.price}</td>
              <td>{game.releaseDate}</td>

              <td>
                <button onClick={() => onEdit(game)}>✏️</button>
                <button onClick={() => handleDelete(game.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameList;
