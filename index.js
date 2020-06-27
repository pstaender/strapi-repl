const REPL = require("repl");

let startStrapiREPL = async (pathToStrapiModule) => {
  let initStrapiApp = async () =>
    await require(`${pathToStrapiModule}/node_modules/strapi`)().load();

  let strapi = await initStrapiApp();
  let environment = process.env.NODE_ENV;
  console.log(
    `Strapi-REPL v${
      require(`${__dirname}/package.json`).version
    } [Environment: ${environment}]`
  );

  const repl = REPL.start(
    global.strapi.config.info.name + " > " || "strapi > "
  );
  repl.context.app = strapi;

  repl.on("exit", function (err) {
    if (err) {
      strapi.log.error(err);
      process.exit(1);
    }
    console.log("Bye");
    process.exit(0);
  });

  repl.defineCommand("reload", {
    help: "Reload strapi",
    async action() {
      if (environment === "development") {
        process.stdout.write("reloading");
        let loadingIndicator = setInterval(
          () => process.stdout.write("."),
          250
        );
        repl.context.strapi = strapi = await initStrapiApp();
        clearInterval(loadingIndicator);
        console.log("");
      } else {
        console.log(
          ".reload is exclusively available in development environment"
        );
      }
      this.displayPrompt();
    },
  });
};

module.exports = { startStrapiREPL };
