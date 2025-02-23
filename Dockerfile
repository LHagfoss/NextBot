FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lockb ./
COPY prisma ./prisma/

RUN bun install
RUN bunx prisma generate

COPY . .

RUN bun run build

EXPOSE 3000

CMD sh -c "if [ -z \"$DISCORD_TOKEN\" ]; then echo \"Error: DISCORD_TOKEN is not set\" && exit 1; fi && bunx prisma db push && bun run dev" 