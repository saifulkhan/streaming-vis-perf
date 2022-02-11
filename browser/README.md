# About

VIS Benchmark.

## Getting Started

### Prerequisites

Please make sure you have [Node.js](https://nodejs.org) (LTS version) and [Yarn](https://www.npmjs.com/package/yarn) (`npm install --global yarn`).

```sh
node --version
## should output ≥ 14.17

yarn --version
## should output ≥ 1.22
```

### Start Development Instance

Install the dependencies.

```sh
yarn install
```

Run the app in development mode using production APIs (you don’t need to start the development instances of the API endpoints).

```sh
yarn dev
```

While the web server is running, you can open [http://localhost:3000](http://localhost:3000) in your browser to view the app.
To stop the server, press `CTRL+C` in the terminal.

---

If you want to use local API endpoints instead of the default remote ones, create a new file called `.env.local` with contents:

```ini

```

The URLs may differ from the examples above depending on your server settings.

Note that you need to restart the server (`yarn dev`) for the changes to take effect.
See [Next.js docs → Environment Variables](https://nextjs.org/docs/basic-features/environment-variables) for more info.

## Local production build

1.  Build the app

    ```sh
    yarn build
    ```

1.  Make sure that port 3000 is not used and launch a simple HTTP server for the just-created `out` directory.

    ```sh
    npx serve out
    ```

1.  Navigate to http://localhost:3000 in your browser.

## References

- Bootstrapped with [Next.js](https://github.com/vercel/next.js)
- Using [React MUI dashboard style](https://mui.com)

### ProtoBuf message

Install ProtoBuf JS, see [doc](https://www.npmjs.com/package/protobufjs).

```bash
npm install protobufjs -g
```

Generate

```bash
cd messages

# spectrum
rm spectrum.js
rm spectrum.d.ts
rm ../browser/src/types/spectrum.d.ts
rm ../browser/src/models/spectrum.js
pbjs -t static-module -w commonjs -o spectrum.js spectrum.proto
pbts -o spectrum.d.ts spectrum.js
mv spectrum.js ../browser/src/models/spectrum.js
mv spectrum.d.ts ../browser/src/types/spectrum.d.ts
```
