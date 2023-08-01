FROM node:18-alpine

WORKDIR /src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

# Start the server using the production build
CMD [ "yarn", "start:dev" ]