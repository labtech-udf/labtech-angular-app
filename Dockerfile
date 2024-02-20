# Estágio de construção
FROM node:20.11 AS build

ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/local/app && cp -a /tmp/node_modules /usr/local/app/

WORKDIR /usr/local/app

# Adicione o código-fonte ao app
COPY ./ /usr/local/app/

# Gere a build da aplicação
RUN npm run build

# Estágio de produção
FROM nginx:1.25.4

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copie os arquivos do estágio de construção para o estágio de produção
COPY --from=build /usr/local/app/dist/build/browser /usr/share/nginx/html

COPY ./nginx.conf  /etc/nginx/conf.d/default.conf