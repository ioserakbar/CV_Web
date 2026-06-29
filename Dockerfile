### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm ci
COPY . .
RUN npm run build --configuration=production

### STAGE 2: Run ###
FROM nginx:latest
### Do note the project name, as 'ng build or npm run build'
### will create the directory structure like this
### /dist/your-project-name
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/cv-web/browser /usr/share/nginx/html

