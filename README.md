makeconf
========

An interactive config generator that creates environment configs (e.g. `.env`)
and keeps them up to date.

*makeconf* can be conveniently added to the `preinstall` script in your project's
package.json file, prompting developers to easily review and update their local
config file every time they run `npm install`.

## Setup

```
$ npm install -g makeconf
```

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
