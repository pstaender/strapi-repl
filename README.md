# Strapi REPL
## Console for your strapi app

Strapi has a built in console (`strapi console`). However, compared to the built-in console, this repl has the following features:

  * await support
  * `.reload` reloads your app (helpful in development)
  * only runs a REPL (and doesn't start your webservice as well)


## Installation

```sh
  $ npm install -g strapi-repl
```

## Run

In any strapi project:

```sh
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
