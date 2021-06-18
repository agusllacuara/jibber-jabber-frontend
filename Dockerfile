FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
ARG configuration=production
RUN npm run build -- --prod --configuration=$configuration
##aca podemos correr --configuration=dev para el entorno de development

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/jibber-jabber-frontend /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
