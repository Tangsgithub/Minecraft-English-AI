const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
let lessonMapContent = fs.readFileSync('src/components/LessonMap.tsx', 'utf8');

// 1. Remove VocabProgressChart from 'map' tab
const mapRegex = /{activeTab === 'map' && \(\s*<>\s*<VocabProgressChart\s*profile=\{profile\}\s*onNavigateToVocab=\{\(\) => setActiveTab\('vocab'\)\}\s*\/>/g;
appContent = appContent.replace(mapRegex, "{activeTab === 'map' && (\n            <>");

// 2. Extract volume control from LessonMap
const volRegex = /\{\/\* ===== 《新概念英语》分册与版本号体系控制面板 ===== \*\/\}.*?\{\/\* Search & Unit Navigation \*\/\}/s;
const match = lessonMapContent.match(volRegex);

if (match) {
    let volControlBlock = match[0].replace('{/* Search & Unit Navigation */}', '').trim();
    
    // 3. Remove from LessonMap
    lessonMapContent = lessonMapContent.replace(match[0], '{/* Search & Unit Navigation */}');
    
    // We also need to remove selectedVolumeId state from LessonMap and add it to App
    lessonMapContent = lessonMapContent.replace(
        /const \[selectedVolumeId, setSelectedVolumeId\] = useState<CourseVolumeId>\(profile\.selectedVolumeId \|\| 'vol1'\);\n/s,
        ''
    );

    // Also need to pass selectedVolumeId to LessonMap from App
    lessonMapContent = lessonMapContent.replace(
        /interface LessonMapProps \{/,
        "interface LessonMapProps {\n  selectedVolumeId: CourseVolumeId;\n"
    );
    lessonMapContent = lessonMapContent.replace(
        /export const LessonMap: React\.FC<LessonMapProps> = \(\{/,
        "export const LessonMap: React.FC<LessonMapProps> = ({\n  selectedVolumeId,"
    );

    // Add selectedVolumeId to App.tsx
    appContent = appContent.replace(
        /const \[activeTab, setActiveTab\] = useState/,
        "const [selectedVolumeId, setSelectedVolumeId] = useState<CourseVolumeId>(profile.selectedVolumeId || 'vol1');\n  const [activeTab, setActiveTab] = useState"
    );
    
    // Import CourseVolumeId in App.tsx
    appContent = appContent.replace(
        /import \{ UserProfile, APP_VERSION_INFO \} from '\.\/types';/,
        "import { UserProfile, APP_VERSION_INFO, CourseVolumeId } from './types';"
    );
    appContent = appContent.replace(
        /import \{ UserProfile \} from '\.\/lib\/firebase';/, // just in case
        ""
    );
    
    // Pass selectedVolumeId to LessonMap
    appContent = appContent.replace(
        /<LessonMap\s*profile=\{profile\}/,
        "<LessonMap\n                selectedVolumeId={selectedVolumeId}\n                profile={profile}"
    );

    // Add volControlBlock to App.tsx before Main App Container
    appContent = appContent.replace(
        /\{\/\* Main App Container \*\/\}/,
        `{/* ===== 《新概念英语》分册与版本号体系控制面板 ===== */}\n      <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 pt-3">\n        ${volControlBlock}\n      </div>\n\n      {/* Main App Container */}`
    );

    // In App.tsx, volControlBlock uses `currentVolume`. We need to define `currentVolume` in App.tsx
    appContent = appContent.replace(
        /const handleCompleteLesson/,
        "const currentVolume = APP_VERSION_INFO.volumes.find(v => v.id === selectedVolumeId) || APP_VERSION_INFO.volumes[0];\n\n  const handleCompleteLesson"
    );
    
    fs.writeFileSync('src/App.tsx', appContent);
    fs.writeFileSync('src/components/LessonMap.tsx', lessonMapContent);
    console.log("Migration done");
} else {
    console.log("Regex not found");
}

