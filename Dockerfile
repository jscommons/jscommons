FROM node:17-buster-slim

ENV NODE_ENV production

# Create and set the working directory.
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install dependencies.
COPY .yarnclean .
COPY yarn.lock .
COPY package.json .
RUN yarn --prod --frozen-lockfile && yarn cache clean

# Add source and build application.
COPY . .
RUN yarn build

# Run the server.
CMD [ "yarn", "start" ]
