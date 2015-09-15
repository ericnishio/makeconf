makeconf
========

An interactive config generator that creates environment configs and keeps them
up to date.

## Setup

```
$ npm install -g makeconf
```

## Usage

Create a `makeconf.json` file in your project directory, e.g.:

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
      "options": [true, false],
      "required": true
    },
    "database": {
      "description": "Database type",
      "options": ["mongo", "mysql", "disk"],
      "required": true
    },
    "alert_level": {
      "default": 1,
      "description": "Alert level",
      "options": [1, 2, 3]
    }
  }
}
```

Supported config types: `.env`

In your project directory, run:

```
$ makeconf
```
