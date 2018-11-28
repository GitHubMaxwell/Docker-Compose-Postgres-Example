FROM node:alpine

MAINTAINER Jon Borgonia <jon@gomagames.com>

ENV PORT 3000

WORKDIR /app

COPY ./* /app/

RUN npm install --production

CMD ["npm", "start"]
