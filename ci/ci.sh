
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"/docker"
DOCKERFILE_IMAGE="xlearns-web:v1"
DOCKERFILE_PATH="${SCRIPT_DIR}/nginx.dockerfile"
DOCKER_CONTEXT_PATH="${SCRIPT_DIR}"

docker build -t $DOCKERFILE_IMAGE -f ${DOCKERFILE_PATH} ${DOCKER_CONTEXT_PATH}
docker run -p 8080:80 $DOCKERFILE_IMAGE
