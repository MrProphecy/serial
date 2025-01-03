
const si = require('systeminformation');

export default async function handler(req, res) {
    try {
        const usbDevices = await si.usb();
        const cameras = usbDevices.filter(device =>
            /camera|webcam/i.test(device.name)
        );

        const response = {
            usbDevices: usbDevices.map(device => ({
                name: device.name || "No disponible",
                vendor: device.vendor || "No disponible",
                id: device.id || "No disponible"
            })),
            cameras: cameras.map(camera => ({
                name: camera.name || "No disponible",
                vendor: camera.vendor || "No disponible"
            }))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("Error obteniendo dispositivos USB:", error);
        res.status(500).json({ error: "Error obteniendo los dispositivos USB" });
    }
}
