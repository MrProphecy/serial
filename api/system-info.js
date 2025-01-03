
const si = require('systeminformation');

export default async function handler(req, res) {
    try {
        const system = await si.system();
        const bios = await si.bios();
        res.status(200).json({
            system: {
                manufacturer: system.manufacturer || "No disponible",
                model: system.model || "No disponible",
                serial: system.serial || "No disponible"
            },
            bios: {
                vendor: bios.vendor || "No disponible",
                version: bios.version || "No disponible",
                serial: bios.serial || "No disponible"
            }
        });
    } catch (error) {
        console.error("Error obteniendo información del sistema:", error);
        res.status(500).json({ error: "Error obteniendo la información del sistema" });
    }
}
