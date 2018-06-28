FROM node:10-alpine

RUN mkdir /roc-mail-sender-source
RUN touch /roc-mail-sender-source/test

COPY ./js/* /roc-mail-sender-source/

# CMD ls /roc-mail-sender-source/
WORKDIR /roc-mail-sender-source/

RUN npm ci

CMD node server.js

EXPOSE 3000