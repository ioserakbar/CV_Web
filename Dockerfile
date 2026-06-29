# FROM node:latest as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# RUN npm install -g @angular/cli
# COPY . .
# RUN npm run build --configuration=production --localize

# FROM nginx:latest
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist/cv-web/browser /usr/share/nginx/html
# EXPOSE 80

### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm i
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
### Do note the project name, as 'ng build or npm run build'
### will create the directory structure like this
### /dist/your-project-name
COPY --from=build /usr/src/app/dist/cv_web /usr/share/nginx/html