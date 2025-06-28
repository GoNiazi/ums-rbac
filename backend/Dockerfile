FROM node:18

WORKDIR /app
COPY . .
RUN npm install express mongoose bcryptjs jsonwebtoken cors dotenv socket.io
EXPOSE 5000
CMD ["node", "server.js"]