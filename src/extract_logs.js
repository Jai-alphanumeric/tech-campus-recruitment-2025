const fs = require('fs');
const readline = require('readline');
const path = require('path');

// Jai Kumar
// 2K21/SE/91

async function extractLogs(date) {
    const inputFile = 'test_logs.log'; // Log file path
    const outputDir = 'output';
    const outputFile = path.join(outputDir, `output_${date}.txt`);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    try {
        const fileStream = fs.createReadStream(inputFile);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const writeStream = fs.createWriteStream(outputFile);

        for await (const line of rl) {
            if (line.startsWith(date)) {
                writeStream.write(line + '\n');
            }
        }

        console.log(`Log entries for ${date} have been written to ${outputFile}`);
        writeStream.end();
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Get date from command-line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.log('Usage: node extract_logs.js YYYY-MM-DD');
} else {
    extractLogs(args[0]);
}
