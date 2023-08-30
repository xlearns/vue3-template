
DOCKERFILE_IMAGE="xlearns-web:v1"

docker build -t $DOCKERFILE_IMAGE .
docker run -p 8080:80 $DOCKERFILE_IMAGE
