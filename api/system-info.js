
const si = require('systeminformation');

export default async function handler(req, res) {
    try {
        const system = await si.system();
        res.status(200).json({
            serial: system.serial || "No disponible"
        });
    } catch (error) {
        console.error("Error obteniendo el número de serie:", error);
        res.status(500).json({ error: "Error obteniendo el número de serie" });
    }
}
