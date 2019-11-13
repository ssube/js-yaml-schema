# js-yaml-schema

This is an extension schema for js-yaml, adding custom tags for
common config types.

## Tags

- `!env`: environment variables
- `!include`: file include, parsed with the same schema
- `!regexp`: regular expression, with flags
- `!stream`: NodeJS stream, from `process` with name restrictions
