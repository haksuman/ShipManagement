# base image
FROM node:14-alpine

# install Docker client
RUN apk update && \
    apk add docker

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# build the app
RUN npm run build

# start the app
CMD ["npm", "run", "serve"]