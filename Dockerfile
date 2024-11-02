FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose both the Vite dev server and Socket.IO server ports
# Note: The application will find available ports if these are in use
EXPOSE 5173
EXPOSE 3001

# Start the application
CMD ["npm", "start"]