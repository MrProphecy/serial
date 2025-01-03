
const si = require('systeminformation');

async function getUsbDevices(req, res) {
    try {
        const usbDevices = await si.usb();
        const cameras = usbDevices.filter(device =>
            /camera|webcam/i.test(device.name)
        );
        const response = {
            usbDevices: usbDevices.map(device => ({
                name: device.name,
                vendor: device.vendor,
                id: device.id
            })),
            cameras: cameras.map(camera => ({
                name: camera.name,
                vendor: camera.vendor
            }))
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los dispositivos USB' });
    }
}
module.exports = getUsbDevices;
