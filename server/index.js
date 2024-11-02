import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Docker from 'dockerode';
import pty from 'node-pty';
import { findAvailablePort } from './port-finder.js';
import { config } from './config.js';

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  // Find available port
  const PORT = await findAvailablePort(config.defaultServerPort);
  
  // Update CORS with dynamic Vite port
  const io = new Server(httpServer, {
    cors: {
      origin: async (origin, callback) => {
        // Allow any origin that matches our Vite server pattern
        if (!origin || origin.match(/^http:\/\/localhost:\d+$/)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ["GET", "POST"]
    }
  });

  const docker = new Docker({
    socketPath: config.socketPath,
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('list-containers', async () => {
      try {
        const containers = await docker.listContainers();
        console.log('Found containers:', containers.length);
        const containerList = containers.map(container => ({
          id: container.Id,
          name: container.Names[0].replace('/', ''),
          status: container.State
        }));
        socket.emit('containers', containerList);
      } catch (error) {
        console.error('Error listing containers:', error);
        socket.emit('error', { message: 'Failed to list containers' });
      }
    });

    socket.on('attach-container', async (containerId) => {
      try {
        console.log('Attaching to container:', containerId);
        const container = docker.getContainer(containerId);
        const exec = await container.exec({
          AttachStdin: true,
          AttachStdout: true,
          AttachStderr: true,
          Tty: true,
          Cmd: ['/bin/sh']
        });

        const stream = await exec.start({
          hijack: true,
          stdin: true
        });

        stream.on('data', (data) => {
          socket.emit(`terminal-output-${containerId}`, data.toString());
        });

        socket.on('terminal-input', ({ containerId: id, data }) => {
          if (id === containerId) {
            stream.write(data);
          }
        });

        socket.on('disconnect', () => {
          console.log('Client disconnected, cleaning up...');
          stream.end();
        });
      } catch (error) {
        console.error('Error attaching to container:', error);
        socket.emit('error', { message: 'Failed to attach to container' });
      }
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Emit the port information so the frontend can use it
    io.emit('server-info', { port: PORT });
  });
}

startServer();