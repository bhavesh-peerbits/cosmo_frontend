FROM node:lts-alpine
ARG PROXY=http://srvprx01.aizoon.it:3128
################ Aizoon-Proxy start #################
ENV http_proxy=${PROXY} \
  https_proxy=${PROXY}
################ Aizoon-Proxy end ############

ARG APP_PATH=/opt/cosmo

USER root

WORKDIR $APP_PATH

ENV NODE_ENV production
ENV SERVER_WEB_CONCURRENCY 5
ENV SERVER_PORT 3000

COPY ./.yarn ./.yarn
COPY ./server/dist ./server/package.json ./server/
COPY ./app/dist/cosmo ./server/cosmo
COPY ./package.json ./yarn.lock .yarnrc.yml ./

RUN yarn workspaces focus --production server

RUN chown -R node:node $APP_PATH/server


WORKDIR $APP_PATH/server

USER node

EXPOSE 3000
#ENTRYPOINT ["tini", "--"]
CMD ["yarn", "start"]