FROM node:lts-slim

WORKDIR /app

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli
# add app
COPY . /app
# start app
CMD ng serve --host 0.0.0.0
