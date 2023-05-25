FROM node:10.17.0-alpine as react-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

ARG gh_token=0
ENV REACT_APP_GITHUB_TOKEN=$gh_token 

COPY . /app
RUN npm run build

FROM nginx:1-alpine
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]