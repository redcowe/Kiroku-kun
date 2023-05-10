FROM node:18.16
WORKDIR /usr/src/kiroku

COPY package.json ./
RUN npm install
COPY . .
run npm run build
CMD [ "node" , "dist/index.js" ]
