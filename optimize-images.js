const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'imagens';
const outputDir = 'imagens/optimized';

// Criar diretório de saída se não existir
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Função para otimizar uma imagem
async function optimizeImage(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .resize(1920, 1080, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({
                quality: 80,
                effort: 6
            })
            .toFile(outputPath);
        
        console.log(`Imagem otimizada: ${outputPath}`);
    } catch (error) {
        console.error(`Erro ao otimizar ${inputPath}:`, error);
    }
}

// Função para processar todas as imagens
async function processImages() {
    const files = fs.readdirSync(inputDir);
    
    for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, path.parse(file).name + '.webp');
            
            await optimizeImage(inputPath, outputPath);
        }
    }
}

processImages(); 