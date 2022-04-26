FROM node:18.0.0-slim
COPY dist dist
ENTRYPOINT [ "node" "/dist/index.js" ]