# Docker Web Terminal

A web-based terminal interface for Docker containers that allows you to interact with your running containers through a modern, user-friendly web interface. Features dynamic port allocation to avoid conflicts.

![Docker Web Terminal](https://github.com/yourusername/docker-web-terminal/raw/main/screenshot.png)

## Features

- 🖥️ **Web-based Terminal**: Access container shells directly from your browser
- 📊 **Container Management**: View and connect to all running containers
- 🔄 **Real-time Interaction**: Execute commands with instant feedback
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Local Access**: Runs on your machine, connecting to your local Docker daemon
- 🔌 **Dynamic Ports**: Automatically finds available ports to avoid conflicts

## Prerequisites

- Node.js 16 or higher
- Docker installed and running on your machine
- Docker socket accessible (default: `/var/run/docker.sock`)

## Quick Start with Docker

The easiest way to run Docker Web Terminal is using Docker:

```bash
# Pull the image
docker pull yourusername/docker-web-terminal

# Run the container
docker run -d \
  -p 5173:5173 \
  -p 3001:3001 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name docker-web-terminal \
  yourusername/docker-web-terminal
```

The application will automatically find available ports if the default ones (5173, 3001) are in use.

## Manual Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/docker-web-terminal.git
   cd docker-web-terminal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Building the Docker Image

To build the Docker image locally:

```bash
# Build the image
docker build -t docker-web-terminal .

# Run locally built image
docker run -d \
  -p 5173:5173 \
  -p 3001:3001 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name docker-web-terminal \
  docker-web-terminal
```

## Configuration

The application uses the following default ports:
- `5173`: Vite development server
- `3001`: Socket.IO server

If these ports are in use, the application will automatically find and use the next available ports.

## Project Structure

```
docker-web-terminal/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   └── types/         # TypeScript types
├── server/
│   ├── index.js       # Backend server
│   ├── config.js      # Server configuration
│   └── port-finder.js # Dynamic port allocation
├── public/           # Static assets
└── package.json     # Project dependencies
```

## Development

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Security Considerations

⚠️ This application provides direct access to your Docker containers. Consider these security implications:

- Only run this on trusted networks
- Don't expose the application to the internet
- Use proper authentication if deploying in a production environment
- Be cautious with container access permissions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with React, TypeScript, and Tailwind CSS
- Uses Socket.IO for real-time communication
- Powered by Xterm.js for terminal emulation
- Docker API integration via Dockerode