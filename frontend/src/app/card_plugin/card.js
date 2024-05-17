export const getCertificate = async () => {
    const socket = new WebSocket('ws://localhost:4444');
    socket.onopen = () => {
        console.log('Connected to server');
    }

    socket.onmessage = (event) => {
        console.log("Received: " + event.data);
    }

    socket.onerror = (error) => {
        console.log(`Error: ${error}`);
    }
    
    await socket.send('get_certificate')
    .then(() => {
        console.log('Message sent');
    })

}