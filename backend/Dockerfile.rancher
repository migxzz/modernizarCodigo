FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["sh", "-c", "npx prisma generate && \
  if [ ! -d 'prisma/migrations' ] || [ -z \"$(ls -A prisma/migrations 2>/dev/null)\" ]; then \
    echo 'Criando migração inicial...' && \
    npx prisma migrate dev --name initial_schema --create-only --skip-generate --skip-seed; \
  fi && \
  npx prisma migrate deploy && \
  npx prisma db seed && \
  npm run dev"]