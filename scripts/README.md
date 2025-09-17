# Scripts

This folder contains utility scripts for maintaining and analyzing the project's internationalization (i18n) system and code quality.

## Available Scripts

## 🌍 Internationalization Scripts

### 🔍 `analyze-i18n-strings.js`

Analyzes the usage of i18n strings across the entire codebase to identify which strings are being used and which are orphaned.

**Usage:**
```bash
node scripts/analyze-i18n-strings.js
```

**Features:**
- Scans all Vue, TypeScript, and JavaScript files in the project
- Identifies used and unused i18n strings
- Provides detailed usage statistics
- Lists files where each string is used
- Outputs unused strings in JSON format for easy copying

**Output Example:**
```
🔍 Analyzing i18n string usage...

✅ USED: examples.buttons.title
   Found in: app\components\ButtonExamples.vue

❌ NOT USED: examples.unused.string

📈 SUMMARY
📊 Total strings: 344
✅ Used strings: 342
❌ Unused strings: 2
📊 Usage rate: 99.4%
```

### 🧹 `cleanup-i18n-strings.js`

Automatically removes unused i18n strings from both language files (en.json and de.json).

**Usage:**
```bash
node scripts/cleanup-i18n-strings.js
```

**Features:**
- Deletes predefined unused strings from both language files
- Removes empty objects after string deletion
- Provides detailed feedback on what was deleted
- Maintains JSON formatting with proper indentation

**⚠️ Important:** 
Before running this script, update the `STRINGS_TO_DELETE` array with the strings you want to remove. You can get this list from the `analyze-i18n-strings.js` output.

## 🔧 Code Quality Scripts

### 🧹 `check-unused-vars.js`

Checks for unused variables and parameters across all TypeScript and Vue files using the TypeScript compiler.

**Usage:**
```bash
node scripts/check-unused-vars.js
```

**Features:**
- Uses TypeScript's built-in `--noUnusedLocals` and `--noUnusedParameters` flags
- Checks all `.ts`, `.vue`, and `.js` files in the project
- Fast and accurate detection using the TypeScript compiler
- Clean output with recommendations for VS Code extensions

### 🔍 `check-unused-vars-enhanced.js`

Enhanced analysis for unused variables with additional import checking and detailed recommendations.

**Usage:**
```bash
node scripts/check-unused-vars-enhanced.js
```

**Features:**
- TypeScript compiler checks for unused locals and parameters
- Basic unused import detection (heuristic-based)
- Detailed recommendations for VS Code extensions and IDE settings
- Cross-platform compatibility (Windows/macOS/Linux)

**Output Example:**
```
🔍 Comprehensive unused variables check for Vue/Nuxt project...

📋 TypeScript unused locals and parameters:
✅ No issues found

🛠️ Recommended tools for continuous monitoring:
   1. VS Code Extensions:
      - TypeScript Importer (auto-remove unused imports)
      - Error Lens (show errors inline)
   
   2. Manual checks:
      - Run: npx tsc --noEmit --noUnusedLocals --noUnusedParameters
```

## ⚙️ Quick Commands

```bash
# Check for unused variables (fast)
npx tsc --noEmit --noUnusedLocals --noUnusedParameters

# Run basic unused variable check
node scripts/check-unused-vars.js

# Run enhanced analysis
node scripts/check-unused-vars-enhanced.js

# Analyze i18n usage
node scripts/analyze-i18n-strings.js

# Clean up unused i18n strings
node scripts/cleanup-i18n-strings.js
```

## Best Practices

### 🌍 i18n Management
1. **Regular Analysis**: Run `analyze-i18n-strings.js` regularly to maintain clean i18n files
2. **Before Cleanup**: Always run the analysis script first to identify unused strings
3. **Backup**: Consider backing up your i18n files before running the cleanup script
4. **Verification**: After cleanup, run the analysis script again to verify the results

### 🔧 Code Quality
1. **Continuous Monitoring**: Use VS Code extensions for real-time unused variable detection
2. **Pre-commit Checks**: Run `check-unused-vars.js` before committing code
3. **IDE Integration**: Configure VS Code to automatically remove unused imports on save
4. **Regular Audits**: Use `check-unused-vars-enhanced.js` for comprehensive analysis

## VS Code Integration

This project includes pre-configured VS Code settings (`.vscode/settings.json`) that automatically:
- Remove unused imports on file save
- Organize imports automatically  
- Fix TypeScript issues on save
- Enable strict unused variable checking

### Recommended Extensions:
- **Vue - Official** - Vue 3 and TypeScript support
- **TypeScript Importer** - Auto-remove unused imports
- **Error Lens** - Inline error visualization
- **Auto Import - ES6, TS, JSX, TSX** - Smart import management

## Configuration

### File Scanning
Both i18n and code quality scripts are configured to search in the following directories:
- `app/components`
- `app/pages` 
- `app/layouts`
- `app/composables`
- `app/plugins`

The scripts look for usage patterns in `.vue`, `.ts`, and `.js` files.

### TypeScript Configuration
The unused variable checks use TypeScript compiler flags:
- `--noUnusedLocals` - Detect unused local variables
- `--noUnusedParameters` - Detect unused function parameters  
- `--noEmit` - Check without generating output files
- `--strict` - Enable strict type checking (enhanced script only)

## Contributing

### Adding New i18n Features
When adding new features that use i18n strings:
1. Add your strings to both `en.json` and `de.json`
2. Run the analysis script to verify proper usage
3. Keep the i18n files clean by regularly removing unused strings

### Code Quality Maintenance
When developing new components:
1. Use TypeScript for better type safety
2. Configure your IDE to show unused variables
3. Run unused variable checks before committing
4. Follow the established patterns for import organization

### Script Development  
When adding new utility scripts:
1. Use ES modules (import/export) syntax
2. Add proper error handling and user feedback
3. Update this README with usage instructions
4. Test on multiple platforms when possible
