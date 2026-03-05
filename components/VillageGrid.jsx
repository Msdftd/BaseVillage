import { useState } from "react";
import { BUILDINGS, GRID_SIZE } from "../lib/buildings";

export default function VillageGrid({ grid, selectedBuilding, onCellClick, isBuilding }) {
  const [hover, setHover] = useState(null);
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold">Your Village</h2>
        <p className="text-xs text-slate-500 mt-1">
          {selectedBuilding ? <>Placing: <span style={{color:BUILDINGS[selectedBuilding].color}} className="font-semibold">{BUILDINGS[selectedBuilding].emoji} {BUILDINGS[selectedBuilding].name}</span></> : "Select a structure from Build menu"}
        </p>
      </div>
      <div className="glass glow-blue" style={{ display:"grid", gridTemplateColumns:`repeat(${GRID_SIZE},60px)`, gap:3, padding:14, borderRadius:18 }}>
        {grid.map((row,r) => row.map((cell,c) => {
          const isHov = hover?.r===r && hover?.c===c;
          const canPlace = !cell && selectedBuilding && !isBuilding;
          const b = cell ? BUILDINGS[cell] : null;
          return (
            <div key={`${r}-${c}`} onClick={() => canPlace && onCellClick(r,c)}
              onMouseEnter={() => setHover({r,c})} onMouseLeave={() => setHover(null)}
              style={{
                width:60, height:60, borderRadius:8,
                border:`1px solid ${isHov&&canPlace ? BUILDINGS[selectedBuilding].color+"50" : "rgba(255,255,255,0.03)"}`,
                background: b ? `${b.color}18` : isHov&&canPlace ? `${BUILDINGS[selectedBuilding].color}0C` : "rgba(255,255,255,0.008)",
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:canPlace?"pointer":"default", transition:"all 0.15s", fontSize:cell?26:16,
              }}>
              {cell ? <span className="anim-plop" style={{filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.4))"}}>{b.emoji}</span>
              : isHov&&canPlace ? <span style={{opacity:0.35,fontSize:22}}>{BUILDINGS[selectedBuilding].emoji}</span>
              : <span style={{color:"rgba(255,255,255,0.03)",fontSize:7}}>•</span>}
            </div>
          );
        }))}
      </div>
    </div>
  );
}
