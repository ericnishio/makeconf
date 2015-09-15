makeconf
========

An interactive local config generator that makes it easy to collaboratively
maintain configuration files (e.g. `.env`).

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
    "s3_access_key": {
      "description": "Your S3 access key"
    },
    "debug": {
      "description": "Enable debug mode",
      "default": false,
      "required": true
    },
    "database": {
      "description": "Database type",
      "required": true
    },
    "alert_level": {
      "default": 1,
      "description": "Alert level"
    }
  }
}
```

In your project directory, run:

```
$ makeconf
```
