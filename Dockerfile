FROM node as base


FROM base as development

WORKDIR /app

COPY package.json /app

RUN npm install 

COPY . /app

EXPOSE 4000

CMD ["npm","run","start-dev"]


FROM base as production 

WORKDIR /app

COPY package.json /app

RUN npm install --omit=dev

COPY . /app

EXPOSE 4000

CMD ["npm","run","start"]


