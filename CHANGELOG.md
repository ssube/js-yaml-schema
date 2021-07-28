# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](///compare/v0.4.0...v0.5.0) (2021-07-28)


### ⚠ BREAKING CHANGES

* this library is now exposed as a module in
the package.json, and may need to be bundled for environments
that do not have stable support for ES modules. nyc has been
replaced with c8 for coverage.
* the 0.5.x release family will support Node 16+
and drop support for previous versions.

### Features

* expose package as ES module da26ddd
* remove unused lodash dependency fa68a96
* **build:** update eslint config, remove tslint plugins 25b5651
* upgrade noicejs to 4.0 a68534e

## [0.4.0](///compare/v0.4.0-4...v0.4.0) (2021-07-10)


### ⚠ BREAKING CHANGES

* **schema:** the include type requires a significant subset of
the synchronous fs API to be provided when creating a schema, even
if the include type is never used. Since the resolution must be
synchronous, the include type is limited to local fs and memory
access, and not very useful with network loading. It has been
removed from the default schema, but can be included by calling
`createIncludeSchema` instead.

### Features

* **schema:** remove include type from default schema 800f6bb
* add optional base schema to schema options 05d5acf


### Bug Fixes

* reduce renovate noise, automerge test deps c074468
* selectively copy mutable schema options 5ef7e15

## [0.4.0-4](///compare/v0.4.0-3...v0.4.0-4) (2021-03-28)


### ⚠ BREAKING CHANGES

* requires js-yaml v4 and the breaking changes to
document parsing and schema types it contains.
* **include:** the include type will make a copy of its options
and return a setter for the `schema`, fixing a bug in createSchema
and allowing it to take readonly options rather than mutating them.
* updates the underlying js-yaml from v3 to v4,
thus including all of the breaking changes from that:
https://github.com/nodeca/js-yaml/blob/master/migrate_v3_to_v4.md.
The API of this module has not changed, but some documents
may be parsed differently, so this is breaking.

### Features

* list allowed encodings, include ASCII 2a9d5e9
* update to js-yaml 4, default schema fc1f4d0


### Bug Fixes

* **build:** pull images from nexus 7a4221a
* **include:** return schema setter, default to default schema 51038a4


### update

* js-yaml peer to v4 9e70447

## [0.4.0-3](///compare/v0.4.0-2...v0.4.0-3) (2020-08-09)


### Features

* **include:** add flag option to includes 0e6880b

## [0.4.0-2](///compare/v0.4.0-1...v0.4.0-2) (2020-08-09)


### ⚠ BREAKING CHANGES

* this allows multiple schemas to coexist, but requires
each schema to be created with a call to `createSchema`, taking a set
of options that includes the former `includeOptions` singleton.

### Features

* switch to instantiated API, add `createSchema` entrypoint 6985a23

## [0.4.0-1](///compare/v0.4.0-0...v0.4.0-1) (2020-08-05)


### Bug Fixes

* remove export alias for include options 143e9f5

## [0.4.0-0](///compare/v0.3.1...v0.4.0-0) (2020-08-04)


### ⚠ BREAKING CHANGES

* usage of the include type now requires a join option

### Features

* add join callback to include options 1d07d7c

### [0.3.1](///compare/v0.3.1-1...v0.3.1) (2020-08-01)

### [0.3.1-1](///compare/v0.3.1-0...v0.3.1-1) (2020-08-01)


### Bug Fixes

* **config:** update lint to naming-convention rule 4a58c20

### [0.3.1-0](///compare/v0.3.0...v0.3.1-0) (2020-07-09)


### Bug Fixes

* require encoding overload for include read callback 6f5a4aa

## [0.3.0](///compare/v0.3.0-5...v0.3.0) (2020-07-09)

## [0.3.0-5](///compare/v0.3.0-4...v0.3.0-5) (2020-07-09)

## [0.3.0-4](///compare/v0.3.0-3...v0.3.0-4) (2020-07-09)


### Bug Fixes

* clean up polyfill plugins, externalize those modules e4963d7

## [0.3.0-3](///compare/v0.3.0-2...v0.3.0-3) (2020-07-09)


### Bug Fixes

* **build:** externalize lodash 04e1ae8

## [0.3.0-2](///compare/v0.3.0-1...v0.3.0-2) (2020-07-01)


### Bug Fixes

* **include:** schema callback types, tests 972c7f2

## [0.3.0-1](///compare/v0.2.0...v0.3.0-1) (2020-06-30)


### ⚠ BREAKING CHANGES

* **include:** rather than use the `fs` functions (`existsSync`,
`readSync`, etc) to include files, this uses fields of the `includeSchema`.
To maintain the previous functionality, fields should be set as follows:

- `exists = existsSync`
- `read = readSync`
- `resolve = realpathSync`
* **build:** removes the umd module in favor of a smaller, standard
ES module. Consumers will need native support for ES modules (recent
evergreen browsers) or a bundler with the same (rollup, webpack, etc).

### Features

* **build:** bundle as ES module 4165928
* **include:** allow consumer to provide fs functions via include schema 77b6f4c


### Bug Fixes

* **build:** add chunk for linked modules to fix cyclical imports, sort test modules into test chunk bc06121
* **test:** cover app main and stream type 87e55c8
* **test:** remove problematic invocation of main from index 3361099

## [0.3.0-0](///compare/v0.2.0...v0.3.0-0) (2020-06-30)


### ⚠ BREAKING CHANGES

* **include:** rather than use the `fs` functions (`existsSync`,
`readSync`, etc) to include files, this uses fields of the `includeSchema`.
To maintain the previous functionality, fields should be set as follows:

- `exists = existsSync`
- `read = readSync`
- `resolve = realpathSync`
* **build:** removes the umd module in favor of a smaller, standard
ES module. Consumers will need native support for ES modules (recent
evergreen browsers) or a bundler with the same (rollup, webpack, etc).

### Features

* **build:** bundle as ES module 4165928
* **include:** allow consumer to provide fs functions via include schema 77b6f4c


### Bug Fixes

* **build:** add chunk for linked modules to fix cyclical imports, sort test modules into test chunk bc06121
* **test:** cover app main and stream type 87e55c8
* **test:** remove problematic invocation of main from index 3361099

## [0.2.0](///compare/v0.1.1...v0.2.0) (2020-03-29)


### ⚠ BREAKING CHANGES

* extract typed errors and use the equivalent
from js-utils

### Bug Fixes

* refactor duplicate utils into js-utils, export symbols 859baa3

### 0.1.1 (2020-03-28)


### Features

* **type:** add env, include, regexp, and stream 133880c
* new project from template 33c2936


### Bug Fixes

* **build:** base sonar project key on gitlab group 342a7b3
* **build:** remove image jobs f88790c
* **build:** set typedefs in package manifest 4b82992
* **docs:** list tags in readme 7c9ad0d
* **test:** helper lint error 000e899

### 0.1.1 (2020-03-28)


### Features

* **type:** add env, include, regexp, and stream 133880c
* new project from template 33c2936


### Bug Fixes

* **build:** base sonar project key on gitlab group 342a7b3
* **build:** remove image jobs f88790c
* **build:** set typedefs in package manifest 4b82992
* **docs:** list tags in readme 7c9ad0d
* **test:** helper lint error 000e899
