makeconf
========

[![NPM version][npm-image]][npm-url]

**REQUIRES Node v4.0.0!**

*An interactive local config generator that makes it easy to collaboratively
maintain configuration files.*

![makeconf][gif]

Generates: `.env`

*makeconf* can be conveniently invoked from within the `postinstall` script
in your project's package.json file, prompting your buddies to review and update
their local config upon running `npm install`.

## Setup

```
$ npm install -g makeconf
```

or

```
$ npm install makeconf --save-dev
```

and run `node_modules/makeconf/bin/makeconf` locally.

## Usage

Create a `makeconf.json` file in your project directory:

```
{
  "type": ".env",
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

In your project directory, run:

```
$ makeconf
```

## License

MIT © [Eric Nishio](http://ericnish.io)

[npm-url]: https://npmjs.org/package/makeconf
[npm-image]: https://img.shields.io/npm/v/makeconf.svg?style=flat-square
[gif]: https://s3-eu-west-1.amazonaws.com/ericnishio/gifs/makeconf.gif
