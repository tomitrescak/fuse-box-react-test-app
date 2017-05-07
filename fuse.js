const {
  Sparky,
  FuseBox,
  JSONPlugin,
  CSSPlugin,
  CSSResourcePlugin
} = require("fuse-box");
const StubPlugin = require('proxyrequire').FuseBoxStubPlugin(/\.tsx?/);
const TestConfig = require('fuse-test-runner').TestConfig;

const fuse = FuseBox.init({
  homeDir: "src",
  output: "dist/$name.js",
  plugins: [
    StubPlugin,
    JSONPlugin()
  ],
  globals: {
    "proxyrequire": "*"
  }
});


Sparky.task("default", () => {
  fuse.bundle("app").instructions(`>index.ts`);
  fuse.run();
});


Sparky.task("test", () => {
  // init test config
  fuse.bundle("app")
    //.plugin(StubPlugin)
    //.globals({ proxyrequire: '*' })
    .test("[**/**.test.tsx]", {
      beforeAll(config) {
        config.snapshotDir = 'src/tests/snapshots';
        config.snapshotExtension = 'json';

        var jsdom = require('jsdom').jsdom;

        global.document = jsdom('');
        global.window = document.defaultView;
        Object.keys(document.defaultView).forEach((property) => {
          if (typeof global[property] === 'undefined') {
            global[property] = document.defaultView[property];
          }
        });

        global.navigator = {
          userAgent: 'node.js'
        };
      }
    });
});

Sparky.task("luis", () => {
  const luisFuse = FuseBox.init({
    homeDir: "src",
    output: "dist/luis/$name.js",
    plugins: [
      JSONPlugin(),
      CSSPlugin({
        group: "bundle.css",
        outFile: `dist/luis/bundle.css`
      })
    ],
    shim: {
      "crypto": {
        exports: "{ randomBytes: () => crypto.getRandomValues(new global.Uint16Array(1))[0] }"
      }
    },
  });

  luisFuse.dev({
    port: 4445,
    httpServer: false
  });

  // luisFuse.bundle("server")
  //   .watch("luis/server/**") // watch only server related code.. bugs up atm
  //   .instructions(" > [luis/server/server.ts]")
  //   // Execute process right after bundling is completed
  //   // launch and restart express
  //   .completed(proc => proc.start())

  // luisFuse.bundle("vendor")
  //   // Watching (to add dependencies) it's damn fast anyway
  //   //.watch()
  //   // first bundle will get HMR related code injected
  //   // it will notify as well
  //   .hmr()
  //   .instructions(" ~ luis/client/client.ts") // nothing has changed here

  // luisFuse.bundle("client")
  //   .watch() // watch only client related code
  //   .hmr()
  //   .sourceMaps(true)
  //   .instructions(" !> [luis/client/client.ts]");

  luisFuse.bundle("server")
    .watch("server/**") // watch only server related code.. bugs up atm
    .instructions(" > [server/luis.ts]")
    // Execute process right after bundling is completed
    // launch and restart express
    .completed(proc => proc.start())

  luisFuse.bundle("vendor")
    // Watching (to add dependencies) it's damn fast anyway
    //.watch()
    // first bundle will get HMR related code injected
    // it will notify as well
    .hmr()
    .instructions(" ~ client/luis.ts") // nothing has changed here

  luisFuse.bundle("client")
    .watch() // watch only client related code
    .hmr()
    .sourceMaps(true)
    .plugin([StubPlugin])
    .globals({
      proxyrequire: '*'
    })
    .instructions(" !> [client/luis.ts]");

  luisFuse.run();
});