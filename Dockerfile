# build step

FROM node
WORKDIR /usr/src/
COPY . .
EXPOSE 5000
RUN npm install
RUN npm run docker:build

CMD ["npm", "run", "docker:start"]