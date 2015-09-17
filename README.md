makeconf
========

[![NPM version][npm-image]][npm-url]

**REQUIRES Node v4.0.0!**

*An interactive local config generator that makes it easier to coordinate
configuration files within a team.*

![makeconf][gif]

*makeconf* can be conveniently invoked from within the `postinstall` script
in your project's package.json file, prompting your buddies to review and update
their local config upon running `npm install`.

## Supported config formats

- `.env`
- `module.exports` (the ubiquitous Node module object containing key-value pairs)

## Setup

```
$ npm install -g makeconf
```

or

```
$ npm install makeconf --save-dev
```

## Usage

Create a `makeconf.json` file in your project directory:

```
{
  "format": ".env",
  "file": ".env",
  "config": {
    "S3_ACCESS_KEY": {
      "description": "Your Amazon S3 access key"
    },
    "DEBUG": {
      "description": "Enable debug mode",
      "default": false,
      "required": true
    },
    "DATABASE": {
      "description": "Database driver",
      "required": true
    }
  }
}
```

Then generate your config file by running:

```
$ makeconf
```

or

```
$ node_modules/makeconf/bin/makeconf
```

if you installed makeconf locally.

## License

MIT © [Eric Nishio](http://ericnish.io)

[npm-url]: https://npmjs.org/package/makeconf
[npm-image]: https://img.shields.io/npm/v/makeconf.svg?style=flat-square
[gif]: /doc/demo.gif
