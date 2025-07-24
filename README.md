# Web Task

This branch is supposed to combine the two tasks "web deployment" and "wikipedia dashboard" into one react webapp.

For the current state of development, you can simple clone this repo and build the docker image to view this for yourself.

## Task 3: Web Deployment

This is a simple webapp that gives links to the IITKgp official websites. The main task is to deploy it to a public domain and make it locally hostable.

Also, for accessing the simple backend api (as per task requirements), add `/api/name` at the end of your main url for the homepage. (e.g. <http://localhost/api/name>)

## Task 4: Wikipedia Dashboard

This part of the project can be viewed directly at `/wiki` or use the frontend options to go to the page.

Currently all the json data fetched by the api is logged on the console and some metadata with thumbnail is shown, next update would make a more interactive and featureful dashboard to organize all the data in a more comfortable form.

### To host the webapp in a server (HTTPS 443 shall be exposed), deploy it

```bash
git clone https://github.com/shub-krishan208/webtasktsg.git
cd webtasktsg
docker compose up -d --build
```

**Note: For the hosting the above in server, make sure the following prerequisites are met:**

- HTTP port (80) is exposed and NOT preqoccupied
- you have installed docker on your machine.

## HTTPS setup completed

For deploying the website to @domain.tech
first make sure your ddomain DNS settings are set properly for values _domain.com_ and _www.domain.com_.

Also, for hosting a server with this project configureation, make sure port 80,81,5000 and 443 are not preoccupied on your server. (for changing ports, check `Dockerfile` for frontend, `nginx.conf` and `docker-compose.yml`)

Also, for the SSL certificates, run the following in the project directory:

```bash
mkdir -p certbot/config # the domain files from /etc/letsencrypt shall be pasted inside this.
mkdir -p certbot/www
```
