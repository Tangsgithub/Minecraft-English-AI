const fs = require('fs');

let content = fs.readFileSync('src/components/GiantWorldMap.tsx', 'utf8');

const regex = /            <\/button>\n          <\/div>\n        <\/div>\n\n        \{\/\* 12 Biome Tabs Quick Navigator \*\/\}/s;

const replacement = `            </button>
          </div>
          </div>
        </div>

        {/* 12 Biome Tabs Quick Navigator */}`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/components/GiantWorldMap.tsx', content);
