# base image
FROM node:17-alpine

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
COPY . .

# # expose the port
# EXPOSE 8080

# build the app
# RUN npm run build

# start the app
# CMD ["npm", "run", "serve", "--", "--port", "8080"]
CMD ["npm", "run", "dev", "--", "--port", "8080"]