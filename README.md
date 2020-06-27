# Strapi REPL
## Console for your strapi app

Strapi has a built in console (`strapi console`). However, compared to the built-in console, this repl has the following features:

  * async/await support
  * `.reload` reloads your app (helpful in development)
  * only runs a REPL (and doesn't start your webservice as well)

For security reasons, the `.reload` feature is only available in development mode.

## Installation

```sh
  $ npm install -g strapi-repl
```

## Run

```sh
  $ cd your_strapi_project
  $ strapi-repl
```

## Example usage

```sh
  strapi > await strapi.query('user', 'users-permissions').findOne()
  {
    username: 'exampleuser',
    …
  }
  strapi > .reload
  reloading... done
  strapi > .exit
```

## License

MIT
