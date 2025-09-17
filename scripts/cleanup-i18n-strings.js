#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Strings to be deleted
const STRINGS_TO_DELETE = [];

/**
 * Removes a string from a nested object
 */
function deleteString(obj, keyPath) {
    const keys = keyPath.split('.');
    const lastKey = keys.pop();

    // Navigate to parent object
    let current = obj;
    for (const key of keys) {
        if (!current[key] || typeof current[key] !== 'object') {
            return false; // Path doesn't exist
        }
        current = current[key];
    }

    // Delete the string
    if (current[lastKey] !== undefined) {
        delete current[lastKey];
        console.log(`✅ Deleted: ${keyPath}`);
        return true;
    } else {
        console.log(`⚠️  Not found: ${keyPath}`);
        return false;
    }
}

/**
 * Removes empty objects recursively
 */
function cleanEmptyObjects(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            cleanEmptyObjects(obj[key]);

            // If object is empty, delete it
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key];
                console.log(`🧹 Empty object removed: ${key}`);
            }
        }
    }
}

/**
 * Cleans up the i18n files
 */
async function cleanupI18nFiles() {
    const localeFiles = ['en.json', 'de.json'];

    console.log('🧹 Starting cleanup of i18n files...\n');

    for (const localeFile of localeFiles) {
        const filePath = path.join(rootDir, 'i18n/locales', localeFile);

        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            continue;
        }

        console.log(`📂 Processing: ${localeFile}`);

        // Load JSON file
        const content = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(content);

        let deletedCount = 0;

        // Delete each string
        for (const stringPath of STRINGS_TO_DELETE) {
            if (deleteString(jsonData, stringPath)) {
                deletedCount++;
            }
        }

        // Remove empty objects
        console.log('🧹 Removing empty objects...');
        cleanEmptyObjects(jsonData);

        // Write cleaned JSON back
        const prettyJson = JSON.stringify(jsonData, null, 4);
        fs.writeFileSync(filePath, prettyJson, 'utf8');

        console.log(`✅ ${localeFile}: ${deletedCount} strings deleted\n`);
    }

    console.log('🎉 Cleanup completed!');
    console.log(`📊 Total ${STRINGS_TO_DELETE.length} strings removed from both language files.`);
}

// Execute script
cleanupI18nFiles().catch(error => {
    console.error('❌ Cleanup error:', error);
    process.exit(1);
});
