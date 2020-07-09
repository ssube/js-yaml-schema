# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
