const {
  Sparky,
  FuseBox,
  JSONPlugin
} = require("fuse-box");

const fuse = FuseBox.init({
  homeDir: "src",
  output: "dist/$name.js",
  plugins: [
    JSONPlugin()
  ]
});


Sparky.task("default", () => {
  fuse.bundle("app").instructions(`>index.ts`);
  fuse.run();
});

Sparky.task("test", () => {
  fuse.bundle("app").test("[**/**.test.ts]");
});

Sparky.task("luis", () => {
  const luisFuse = FuseBox.init({
    homeDir: "src",
    output: "dist/luis/$name.js",
    plugins: [
      JSONPlugin()
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

  luisFuse.bundle("server")
    .watch("luis/server/**") // watch only server related code.. bugs up atm
    .instructions(" > [luis/server/server.ts]")
    // Execute process right after bundling is completed
    // launch and restart express
    .completed(proc => proc.start())

  luisFuse.bundle("vendor")
    // Watching (to add dependencies) it's damn fast anyway
    //.watch()
    // first bundle will get HMR related code injected
    // it will notify as well
    .hmr()
    .instructions(" ~ luis/client/client.ts") // nothing has changed here

  luisFuse.bundle("client")
    .watch() // watch only client related code
    .hmr()
    .sourceMaps(true)
    .instructions(" !> [luis/client/client.ts]");

  luisFuse.run();
});