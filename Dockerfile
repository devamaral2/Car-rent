FROM node:alpine
COPY package.json .
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 8000
CMD ["pnpm", "start"]