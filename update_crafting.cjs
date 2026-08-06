const fs = require('fs');

let content = fs.readFileSync('src/components/CraftingLabView.tsx', 'utf8');

const addFunc = `
  const handleAddIngredientToGrid = (icon: string) => {
    playClickSound();
    const newGrid = [...gridSlots];
    const emptyIndex = newGrid.indexOf(null);
    if (emptyIndex !== -1) {
      newGrid[emptyIndex] = icon;
      setGridSlots(newGrid);
    }
  };

  const handleRemoveFromGrid = (index: number) => {
    if (!gridSlots[index]) return;
    playClickSound();
    const newGrid = [...gridSlots];
    newGrid[index] = null;
    setGridSlots(newGrid);
  };
`;

content = content.replace(
  'const handleClearGrid = () => {', 
  addFunc + '\n  const handleClearGrid = () => {'
);

const ingredientRegex = /<span key=\{iIdx\} className="text-\[10px\] bg-white border border-slate-200 px-1\.5 py-0\.5 rounded-md flex items-center space-x-1 shadow-sm">\s*<span>\{ing\.icon\}<\/span>\s*<span>\{ing\.name\}<\/span>\s*<\/span>/g;

const replacement = `<button key={iIdx} onClick={(e) => { e.stopPropagation(); handleAddIngredientToGrid(ing.icon); }} className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 hover:border-amber-400 active:scale-95 px-1.5 py-0.5 rounded-md flex items-center space-x-1 shadow-sm transition-all cursor-pointer">
                              <span>{ing.icon}</span>
                              <span>{ing.name}</span>
                            </button>`;

content = content.replace(ingredientRegex, replacement);

const gridRegex = /<div\s+key=\{idx\}\s+className=\{`w-14 h-14 sm:w-16 sm:h-16 bg-\[#3D2811\] border-2 border-\[#8B6133\] rounded-lg flex items-center justify-center text-2xl sm:text-3xl shadow-inner transition-transform \$\{\s*isCraftingAnimation \? 'animate-pulse scale-95' : ''\s*\}\`\}>/g;

const gridReplacement = `<div
                    key={idx}
                    onClick={() => handleRemoveFromGrid(idx)}
                    className={\`w-14 h-14 sm:w-16 sm:h-16 bg-[#3D2811] border-2 border-[#8B6133] rounded-lg flex items-center justify-center text-2xl sm:text-3xl shadow-inner transition-transform cursor-pointer hover:bg-[#4A3215] \${
                      isCraftingAnimation ? 'animate-pulse scale-95' : ''
                    }\`}>`;

content = content.replace(gridRegex, gridReplacement);

fs.writeFileSync('src/components/CraftingLabView.tsx', content, 'utf8');
console.log("Updated CraftingLabView.tsx");
