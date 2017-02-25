FROM elaijuh/node
ENV PROJECT_NAME famn
MAINTAINER hjl <jiale@implustech.com>

RUN mkdir /famn
WORKDIR /famn

COPY package.json yarn.lock /famn/
RUN yarn --ignore-optional && yarn cache clean

COPY . /famn

EXPOSE 8080

RUN yarn run build:client:prod
RUN yarn run build:server:prod
CMD sleep 5s && yarn run start:prod

