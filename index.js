const REPL = require("repl");

let initStrapiApp = async (pathToStrapiModule) => {
  return await require(`${pathToStrapiModule}/node_modules/strapi`)().load();
};

let startStrapiREPL = async (pathToStrapiModule) => {
  let strapi = await initStrapiApp(pathToStrapiModule);
  // environment is set to development by default via strapi
  const environment = process.env.NODE_ENV;
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
      process.stdout.write("reloading");
      let loadingIndicator = setInterval(() => process.stdout.write("."), 250);
      repl.context.strapi = strapi = await initStrapiApp(pathToStrapiModule);
      clearInterval(loadingIndicator);
      console.log("");
      this.displayPrompt();
    },
  });
};

module.exports = { startStrapiREPL };
