# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies for node-gyp (needed for some npm packages)
RUN apk add --no-cache python3 make g++

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build the Angular app using local CLI
RUN npx ng build --configuration=production

# Production Stage
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular files
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
