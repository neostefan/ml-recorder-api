FROM node:16-alpine3.16
RUN mkdir recorder
WORKDIR /recorder
COPY . ./
ENV NODE_ENV=production
ENV PORT=3000
ENV MONGO_DB_PROD_URI=mongodb://db:27017/recorder
RUN npm install --include=dev
RUN npm run build
EXPOSE 3000
VOLUME [ "/public/data" ]
CMD [ "node", "./dist/server.js" ]
