#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Configuration
const CONFIG = {
    i18nPath: path.join(rootDir, 'i18n/locales/en.json'),
    searchPaths: [
        path.join(rootDir, 'app/components'),
        path.join(rootDir, 'app/pages'),
        path.join(rootDir, 'app/layouts'),
        path.join(rootDir, 'app/composables'),
        path.join(rootDir, 'app/plugins')
    ],
    fileExtensions: ['.vue', '.ts', '.js']
};

/**
 * Extracts all strings from i18n JSON recursively
 */
function extractAllStrings(obj, prefix = '') {
    const strings = [];

    for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
            // Recursive for nested objects
            strings.push(...extractAllStrings(value, fullKey));
        } else if (typeof value === 'string') {
            // String found
            strings.push(fullKey);
        }
    }

    return strings;
}

/**
 * Searches for all files in the specified paths
 */
function findFiles(searchPaths, extensions) {
    const files = [];

    function searchDirectory(dir) {
        try {
            const items = fs.readdirSync(dir);

            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    searchDirectory(fullPath);
                } else if (stat.isFile()) {
                    const ext = path.extname(fullPath);
                    if (extensions.includes(ext)) {
                        files.push(fullPath);
                    }
                }
            }
        } catch (error) {
            console.warn(`Warning: Cannot read directory ${dir}:`, error.message);
        }
    }

    for (const searchPath of searchPaths) {
        if (fs.existsSync(searchPath)) {
            searchDirectory(searchPath);
        }
    }

    return files;
}

/**
 * Checks if a string is used in a file
 */
function isStringUsedInFile(filePath, stringKey) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Various patterns for i18n string usage
        const patterns = [
            `'${stringKey}'`,      // Single quotes
            `"${stringKey}"`,      // Double quotes
            `\`${stringKey}\``,    // Template literals
            `('${stringKey}')`,    // Function call with single quotes
            `("${stringKey}")`,    // Function call with double quotes
            `(\`${stringKey}\`)`,  // Function call with template literals
        ];

        return patterns.some(pattern => content.includes(pattern));
    } catch (error) {
        console.warn(`Warning: Cannot read file ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Analyzes the usage of i18n strings
 */
async function analyzeStringUsage() {
    console.log('🔍 Analyzing i18n string usage...\n');

    // 1. Load i18n file
    if (!fs.existsSync(CONFIG.i18nPath)) {
        console.error(`❌ i18n file not found: ${CONFIG.i18nPath}`);
        return;
    }

    const i18nContent = JSON.parse(fs.readFileSync(CONFIG.i18nPath, 'utf8'));
    const allStrings = extractAllStrings(i18nContent);

    console.log(`📊 Found i18n strings: ${allStrings.length}`);
    console.log('📝 All strings:');
    allStrings.forEach(str => console.log(`  - ${str}`));
    console.log('');

    // 2. Find all files
    const files = findFiles(CONFIG.searchPaths, CONFIG.fileExtensions);
    console.log(`📂 Files to search: ${files.length}\n`);

    // 3. Usage analysis
    const usedStrings = new Set();
    const unusedStrings = [];

    console.log('🔍 Checking string usage...\n');

    for (const stringKey of allStrings) {
        let isUsed = false;
        const usedInFiles = [];

        for (const file of files) {
            if (isStringUsedInFile(file, stringKey)) {
                isUsed = true;
                usedInFiles.push(path.relative('.', file));
            }
        }

        if (isUsed) {
            usedStrings.add(stringKey);
            console.log(`✅ USED: ${stringKey}`);
            console.log(`   Found in: ${usedInFiles.join(', ')}`);
        } else {
            unusedStrings.push(stringKey);
            console.log(`❌ NOT USED: ${stringKey}`);
        }
        console.log('');
    }

    // 4. Summary
    console.log('\n' + '='.repeat(60));
    console.log('📈 SUMMARY');
    console.log('='.repeat(60));
    console.log(`📊 Total strings: ${allStrings.length}`);
    console.log(`✅ Used strings: ${usedStrings.size}`);
    console.log(`❌ Unused strings: ${unusedStrings.length}`);
    console.log(`📊 Usage rate: ${((usedStrings.size / allStrings.length) * 100).toFixed(1)}%`);

    if (unusedStrings.length > 0) {
        console.log('\n🗑️  STRINGS TO DELETE:');
        unusedStrings.forEach(str => console.log(`  - ${str}`));

        // JSON format for easy copying
        console.log('\n📋 JSON array of strings to delete:');
        console.log(JSON.stringify(unusedStrings, null, 2));
    }

    return {
        total: allStrings.length,
        used: usedStrings.size,
        unused: unusedStrings,
        usageRate: (usedStrings.size / allStrings.length) * 100
    };
}

// Execute program
analyzeStringUsage().catch(error => {
    console.error('❌ Analysis error:', error);
    process.exit(1);
});

export { analyzeStringUsage, extractAllStrings };
