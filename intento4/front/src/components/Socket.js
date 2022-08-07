import io from 'socket.io-client';
const socket = io('//localhost:4000')|| io('//aa5f-143-0-64-222.ngrok.io');
export default socket;