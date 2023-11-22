# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:latest as base
WORKDIR /webapp

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb temp/dev/
RUN cd ./temp && \
    echo $PWD && \
    cd ./dev && \
    echo $PWD && \
    bun install --frozen-lockfile && \
    cd ./node_modules && \
    echo $PWD && \
    ls 

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
RUN ls && \
    cd ./temp && \
    cd ./dev && \
    echo $PWD && \
    ls 
COPY --from=install /webapp/temp/dev/node_modules node_modules
COPY . .

# copy production dependencies and source code into final image
#FROM base AS release
#COPY --from=install temp/prod/node_modules node_modules
#COPY --from=prerelease /webapp/src/index.ts .
#COPY --from=prerelease /webapp/package.json .

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "src/index.ts" ]