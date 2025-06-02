const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const outputDir = path.join(__dirname, 'images', 'optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to optimize images
async function optimizeImages() {
    const files = fs.readdirSync(imagesDir);
    
    for (const file of files) {
        if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
            const inputPath = path.join(imagesDir, file);
            const outputPath = path.join(outputDir, file.replace(/\.(jpeg|jpg|png)$/, '.webp'));
            
            try {
                // Optimize and convert to WebP
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                
                console.log(`Optimized ${file} to WebP`);
            } catch (error) {
                console.error(`Error optimizing ${file}:`, error);
            }
        }
    }
}

optimizeImages(); 