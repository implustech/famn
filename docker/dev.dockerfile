FROM elaijuh/node
ENV PROJECT_NAME famn
MAINTAINER hjl <jiale@implustech.com>

RUN mkdir /famn
WORKDIR /famn

COPY package.json yarn.lock /famn/
RUN yarn --ignore-optional && yarn cache clean

EXPOSE 3030

CMD yarn run start:hmr
