FROM node:6.9.1
ENV PROJECT_NAME famn
MAINTAINER hjl <jiale@implustech.com>

# dockerize to set dependency on process level
ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# httpredir.debian.org is 'magic', so do steps below:
# - go httpredir.debian.org/demo.html find the static domain, in my case http://debian-mirror.sakura.ne.jp/debian/
# - replace the origin httpredir.debian.org with it
# RUN sed -i "s/httpredir.debian.org/debian-mirror.sakura.ne.jp/" /etc/apt/sources.list

# https://yarnpkg.com/en/docs/install
RUN apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update \
    && apt-get install git-core yarn \
    && rm -rf /var/lib/apt/lists/*
RUN mkdir /famn
WORKDIR /famn

COPY package.json /famn/package.json
RUN yarn --ignore-optional && yarn cache clean


COPY . /famn

EXPOSE 3030

# RUN npm run build:dev
CMD dockerize -wait tcp://mongo:27017 -timeout 5s yarn run start:hmr
