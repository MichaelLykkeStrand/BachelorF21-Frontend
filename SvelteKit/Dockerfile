FROM node:12.18.1

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
#FROM mhart/alpine-node:slim-12

#WORKDIR /app
#COPY --from=0 /app .
#COPY . .

EXPOSE 3000
#RUN npm run start
CMD ["node", "svelte-kit start"]