
const si = require('systeminformation');

async function getScreenAndGraphicsInfo(req, res) {
    try {
        const [graphics, displays] = await Promise.all([
            si.graphics(),
            si.graphicsDisplays()
        ]);

        const response = {
            screens: displays.map(display => ({
                model: display.model,
                serial: display.serial || 'No disponible',
                resolution: `${display.resolutionx}x${display.resolutiony}`
            })),
            graphics: graphics.controllers.map(controller => ({
                model: controller.model,
                vendor: controller.vendor,
                vram: controller.vram
            }))
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la información de hardware' });
    }
}
module.exports = getScreenAndGraphicsInfo;
