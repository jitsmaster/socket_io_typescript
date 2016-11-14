import { Server } from './Server';
import { Route } from './Route';

var routes: Route[] = [
	{
		route: '/',
		handler: (req, resp) => {
			resp.sendFile(__dirname + '/files/index.html');
		}
	}
]

var server = Server.bootstrap();

server.io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		server.io.emit('chat message', msg);
	});
});
server.start(routes, 3000);

