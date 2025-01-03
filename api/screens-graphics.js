
const si = require('systeminformation');

export default async function handler(req, res) {
    try {
        const [graphics, displays] = await Promise.all([
            si.graphics(),
            si.graphicsDisplays()
        ]);

        const response = {
            screens: displays.map(display => ({
                model: display.model || "No disponible",
                serial: display.serial || "No disponible",
                resolution: `${display.resolutionx || 0}x${display.resolutiony || 0}`
            })),
            graphics: graphics.controllers.map(controller => ({
                model: controller.model || "No disponible",
                vendor: controller.vendor || "No disponible",
                vram: controller.vram || "No disponible"
            }))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("Error obteniendo información de pantallas y tarjetas gráficas:", error);
        res.status(500).json({ error: "Error obteniendo la información de hardware" });
    }
}
