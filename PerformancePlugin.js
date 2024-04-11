const path = require('path');
const { ConcatSource } = require('webpack-sources');

class PerformancePlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('PerformancePlugin', (compilation, callback) => {
            const assets = compilation.assets;

            let totalSizeBefore = 0;
            let totalSizeAfter = 0;

            Object.keys(assets).forEach(assetName => {
                const asset = assets[assetName];

                totalSizeBefore += asset.size();

                // Оптимизация - Например, можно применить сжатие
                // asset.source() = compress(asset.source());

                totalSizeAfter += asset.size();
            });

            const message = `Total size before optimization: ${totalSizeBefore} bytes, Total size after optimization: ${totalSizeAfter} bytes`;

            compilation.assets['performance.txt'] = new ConcatSource(message);

            callback();
        });
    }
}

module.exports = PerformancePlugin;
