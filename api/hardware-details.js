
const si = require('systeminformation');

export default async function handler(req, res) {
    try {
        const [cpu, memLayout, baseboard] = await Promise.all([
            si.cpu(),
            si.memLayout(),
            si.baseboard()
        ]);

        const ramSlots = memLayout.map(mem => ({
            type: mem.type || "No disponible",
            size: mem.size || 0,
            manufacturer: mem.manufacturer || "No disponible"
        }));

        res.status(200).json({
            cpu: {
                manufacturer: cpu.manufacturer || "No disponible",
                brand: cpu.brand || "No disponible",
                cores: cpu.cores || 0,
                speed: cpu.speed || "No disponible"
            },
            memory: {
                totalSlots: ramSlots.length,
                ramSlots: ramSlots
            },
            baseboard: {
                manufacturer: baseboard.manufacturer || "No disponible",
                model: baseboard.model || "No disponible",
                serial: baseboard.serial || "No disponible"
            }
        });
    } catch (error) {
        console.error("Error obteniendo información de hardware:", error);
        res.status(500).json({ error: "Error obteniendo la información de hardware" });
    }
}
