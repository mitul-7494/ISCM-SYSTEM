FROM ghcr.io/puppeteer/puppeteer:21.6.1

ENV PUPPETEER_SKIP_DOWNLOAD true \
    PUPPETEER_EXACUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR = /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "index.js"]