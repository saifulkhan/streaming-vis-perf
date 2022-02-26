FROM node:16-slim

ARG NEXT_PUBLIC_WS_API
ENV NEXT_PUBLIC_WS_API=${NEXT_PUBLIC_WS_API}

WORKDIR /usr/src/visualisation

COPY . ./

# installing dependencies
RUN rm -rf node_modules
# RUN yarn install -force
RUN npm install

# start development server without building
CMD ["yarn", "dev"]
