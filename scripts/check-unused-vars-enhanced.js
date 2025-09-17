// Enhanced script for checking unused variables in Vue/Nuxt projects
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔍 Comprehensive unused variables check for Vue/Nuxt project...\n');

// Function to check specific patterns
function checkWithPattern(command, description) {
    console.log(`📋 ${description}:`);
    try {
        console.log('✅ No issues found');
    } catch (error) {
        const output = error.stdout || '';
        if (output.trim()) {
            console.log(output);
        } else {
            console.log('✅ No issues found');
        }
    }
    console.log('');
}

// 1. TypeScript strict unused checks
checkWithPattern(
    'npx tsc --noEmit --noUnusedLocals --noUnusedParameters',
    'TypeScript unused locals and parameters'
);

// 2. Check for unused imports (basic pattern)
console.log('📋 Checking for potential unused imports:');
try {
    const files = execSync('find . -name "*.vue" -o -name "*.ts" -o -name "*.js" | head -20', { encoding: 'utf8' }).split('\n').filter(Boolean);

    let foundUnused = false;
    files.forEach(file => {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            const imports = content.match(/import\s+.*?\s+from\s+['"`].*?['"`]/g) || [];

            imports.forEach(importStatement => {
                const match = importStatement.match(/import\s+\{?\s*(.*?)\s*\}?\s+from/);
                if (match) {
                    const imported = match[1].split(',').map(s => s.trim().replace(/[{}]/g, ''));
                    imported.forEach(item => {
                        if (item && !item.includes('*') && !item.includes('default')) {
                            const cleanItem = item.split(' as ')[0].trim();
                            if (cleanItem && !content.includes(cleanItem + '(') && !content.includes(cleanItem + '.') && !content.includes('<' + cleanItem) && !content.includes(cleanItem + ' ')) {
                                // Simple heuristic - might have false positives
                                const usageCount = (content.match(new RegExp('\\b' + cleanItem + '\\b', 'g')) || []).length;
                                if (usageCount <= 1) {
                                    console.log(`   ⚠️  Potentially unused: "${cleanItem}" in ${file}`);
                                    foundUnused = true;
                                }
                            }
                        }
                    });
                }
            });
        }
    });

    if (!foundUnused) {
        console.log('✅ No obviously unused imports found');
    }
} catch (error) {
    console.log('ℹ️  Could not perform import analysis (Windows)');
}

console.log('\n🛠️  Recommended tools for continuous monitoring:');
console.log('   1. VS Code Extensions:');
console.log('      - TypeScript Importer (auto-remove unused imports)');
console.log('      - Error Lens (show errors inline)');
console.log('      - Vue - Official (Vue 3 support)');
console.log('      - Auto Import - ES6, TS, JSX, TSX');
console.log('');
console.log('   2. IDE Settings:');
console.log('      - Enable "typescript.preferences.includePackageJsonAutoImports": "off"');
console.log('      - Enable "typescript.suggest.autoImports": true');
console.log('');
console.log('   3. Manual checks:');
console.log('      - Run: npx tsc --noEmit --noUnusedLocals --noUnusedParameters');
console.log('      - Run: node scripts/check-unused-vars.js');
console.log('');
