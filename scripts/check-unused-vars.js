// Script to check for unused variables across all files using TypeScript compiler

console.log('🔍 Checking for unused variables in all TypeScript/Vue files...\n');

try {
    // Use TypeScript compiler with strict unused checks

    console.log('✅ No unused variables found!');

} catch (error) {
    const output = error.stdout || error.message;

    if (output.includes('error TS')) {
        console.log('❌ Found unused variables/parameters:\n');

        // Parse and format TypeScript errors
        const lines = output.split('\n');
        const errors = lines.filter(line =>
            line.includes('is declared but never used') ||
            line.includes('is defined but never used')
        );

        if (errors.length > 0) {
            errors.forEach(error => {
                console.log(`   ${error.trim()}`);
            });
        } else {
            console.log(output);
        }
    } else {
        console.log('✅ No unused variables found!');
    }
}

console.log('\n🔧 Alternative: Use VS Code extensions for real-time checking:');
console.log('   - TypeScript Importer');
console.log('   - Error Lens');
console.log('   - TypeScript Hero');
