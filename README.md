# JibberJabberFrontend

## Run build with docker
### Development

````bash
docker build -t jibber-jabber-frontend:latest --build-arg configuration="development" .
docker run -d -p 80:80 jibber-jabber-frontend:latest
````

### Production
````bash
docker build -t jibber-jabber-frontend:latest --build-arg .
docker run -d -p 80:80 docker-angular:latest
````
