FROM elaijuh/node
ENV PROJECT_NAME famn
MAINTAINER hjl <jiale@implustech.com>

# dockerize to set dependency on process level
# ENV DOCKERIZE_VERSION v0.2.0
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir /famn
WORKDIR /famn

COPY package.json yarn.lock /famn/
RUN yarn --ignore-optional && yarn cache clean

EXPOSE 3030

# RUN npm run build:dev
# CMD dockerize -wait tcp://mongo:27017 -timeout 5s yarn run start:hmr
CMD yarn run start:hmr
