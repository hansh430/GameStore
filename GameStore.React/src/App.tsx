import { useState } from "react"
import type { Game } from "./types/Game";
import Navbar from "./components/Navbar";
import GameList from "./components/GameList";
import GameForm from "./components/GameForm";

function App() {
 const [view, setView] = useState<"list" | "form">("list");
 const [selectedGame, setSelectedGame]=useState<Game | null>(null);

  return (
    <>
     <Navbar/>

     {view==="list" && (
      <GameList
      onCreate={()=>{
        setSelectedGame(null);
        setView("form");
      }}
      onEdit={(game)=>{
        console.log("edit...");
        setSelectedGame(game);
        setView("form");
      }}
      />
     )}

     {view==="form" && (
      <GameForm
      selectedGame={selectedGame}
      onCancel={()=>{setView("list")}}
      onSuccess={()=>{setView("list")}}
      />
     )}
    </>
  );
}

export default App
