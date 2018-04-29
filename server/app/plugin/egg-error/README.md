[![Build Status](https://travis-ci.org/packages/egg-error.svg?branch=master)](https://travis-ci.org/packages/egg-error)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/packages/egg-error?branch=master&svg=true)](https://ci.appveyor.com/project/packages/egg-error)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/egg-error.svg)](http://badge.fury.io/js/egg-error)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/egg-error.svg)](https://www.npmjs.org/package/egg-error)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/packages/egg-error.svg)](https://david-dm.org/packages/egg-error)
-->

# egg-error

<!-- description -->

## Install

```sh
$ npm install @beastshop/egg-error --save
```

## Usage

config/plugin.js
```js
exports.error = {
  enable: true,
  package: '@beastshop/egg-error'
}
```  
  
config/config.default.js
```js
module.exports = {
  error: {
    client: {} // tell egg to add one `egg-error` instanse
  }
}
```  
  
项目启动后error方法已挂在到app实例，直接通过app.error()调用
比如`app/controller/template.js`
```js
const fs = require('fs-extra')
module.exports = class TemplateController extends Controller {
  async index() {
    const filepath = `no such file`
    fs
      .readFile(filepath)
      .catch((err) => {
        this.app.error('ERR_IO', err) // 直接调用
      })
  }
}
```




## License

MIT
