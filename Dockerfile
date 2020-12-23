# Stage 1
FROM node:10 as react-build
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run-script build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=react-build /app/build /usr/share/nginx/www
# COPY build /usr/share/nginx/www
RUN chmod -R a+r /usr/share/nginx/html