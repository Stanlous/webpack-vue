# webpack-vue
Integrated webpack 3 and vue and eggjs server for development and production.

# Setup

```sh
$ git clone https://github.com/Stanlous/webpack-vue.git
$ cd webpack-vue
$ npm install 
```


# Usage
## For development
```sh
$ npm run dev
```
Then http://127.0.0.1:8000 will be opened in browser automatically.

- **Add a page** 

static/pages.js
```js
  module.exports = {
    ...
    another: 'another/index.js',
    ...
  }
```

server/app/route/index.js
```js
  module.exports = {
    ...
    'GET /another': {
      template: 'another.html'
    },
    ...
  }
```
page `another` is served on http://127.0.0.1:8000/another

- **Add a service**   

server/app/route/index.js
```js
  module.exports = {
    ...
    'POST /access_token': {
      controller: 'accessToken.index'
    },
    ...
  }
```
server/app/controller/access-token.js
```js
  const Controller = require('egg').Controller
  module.exports = class AccessController extends Controller {
    async index() {
      //do what you want
    }
  }
```
service is served on http://127.0.0.1:8000/access_token

## For production
```sh
npm run production
```
Server will be started at http://127.0.0.1:10010, set `process.env.SERVER_PORT` to specify server port.
All static files include `html` `css` `js` will be built into directory `public` with `content-hash`.

# Why not use Webpack4 ?
When I started this project, I used Webpack4 at first.
But Webpack4 has a lot of bugs and is released frequently, it's unstable!
After Webpack4 is stable, I will update to Webpack4.  

# Todo list
- [ ] Source Map
- [ ] SSR
- [ ] CLI
- [ ] Many others

# License
MIT