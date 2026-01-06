const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    'hero-bg.png',
    'trust-visual.png',
    'hero-dashboard.png'
];

const publicDir = path.join(__dirname, 'public');

async function optimizeImages() {
    for (const file of images) {
        const filePath = path.join(publicDir, file);
        const backupPath = path.join(publicDir, `${file}.bak`);

        // Backup original
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(filePath, backupPath);
        }

        // Get metadata
        const metadata = await sharp(filePath).metadata();
        console.log(`Optimizing ${file}: ${metadata.width}x${metadata.height}, ${metadata.size} bytes`);

        // Optimize
        await sharp(filePath)
            .resize(1920, null, { // Max width 1920, maintain aspect ratio
                withoutEnlargement: true,
                fit: 'inside'
            })
            .png({
                quality: 80,
                compressionLevel: 9,
                palette: true // Quantize colors to reduce size significantly
            })
            .toFile(path.join(publicDir, `optimized-${file}`));

        // Replace original
        fs.renameSync(path.join(publicDir, `optimized-${file}`), filePath);

        // Get new size
        const newMetadata = await sharp(filePath).metadata();
        console.log(`Optimized ${file}: ${newMetadata.size} bytes (Saved ${Math.round((1 - newMetadata.size / metadata.size) * 100)}%)`);
    }
}

optimizeImages().catch(console.error);
