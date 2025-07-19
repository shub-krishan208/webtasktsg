# Dockerfile for the main reverse proxy service


# start official nginx image
FROM nginx:stable-alpine


# copy the custom nginx config to overwrite the default config
COPY nginx.conf /etc/nginx/conf.d/default.conf
