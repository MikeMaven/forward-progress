const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const microcache = require('route-cache');
const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');
const logger = require('./logger');
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const ngrok = process.env.ENABLE_TUNNEL ? require('ngrok') : false;
const useMicroCache = process.env.MICRO_CACHE !== 'false';
require('dotenv').config();
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

global.appConfig = _.merge(
  {},
  require('./config.json'),
  require('./config.prod.json'),
  { isDev, isProd }
);
global.errorHandler = require('./errorHandler');

const app = express();
const db = require('./db/models');
const server = http.createServer(app);
const io = socketIO(server);

function createRenderer(bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      // this is only needed when vue-server-renderer is npm-linked
      basedir: resolve('../dist'),
      // recommended for performance
      runInNewContext: false
    })
  );
}

let renderer;
let readyPromise;
const templatePath = resolve('../src/index.template.html');
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('../dist/vue-ssr-server-bundle.json');
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('../dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('../build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    }
  );
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

app.use('*', cors());
app.use(helmet());
app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data
app.use(compression({ threshold: 0 }));
app.use(cookieParser());
app.use('/notes', serve('../src/packs/notes'));
app.use(favicon('./public/images/favicon.ico'));
app.use('/dist', serve('../dist', true));
app.use('/public', serve('../public', true));
app.use('/manifest.json', serve('../manifest.json', true));
app.use('/service-worker.js', serve('../dist/service-worker.js'));
app.disable('x-powered-by');
app.use(morgan('dev'));
// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl));

require('./policy/admin.policy').invokeRolesPolicies();
require('./policy/content.policy').invokeRolesPolicies();
const router = require('./routes');

app.use(router);

async function render(req, res) {
  const s = Date.now();

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Server', serverInfo);

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found');
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  };

  const uc = require('./api/app.controller');
  let appData = await uc.content(req);

  if (req.query.access_token) {
    appData = _.extend(appData, { access_token: req.query.access_token });
  }

  const context = {
    title: appData.content.app_title, // default title
    url: req.url,
    appData
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err);
    }
    html = html.replace(
      '<div id="preloadedstate"></div>',
      `<script>window.__PRELOADEDSTATE__ = ${JSON.stringify(appData).replace(
        /</g,
        '\\u003c'
      )}</script>`
    );
    res.send(html);
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`);
    }
  });
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res));
  }
);

const port = process.env.PORT || 3000;
// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
server.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    (async function() {
      console.log('Waiting for ngrok connection');
      url = await ngrok.connect(port);
      console.log({ url });
    })().catch(err => {
      return logger.error(err);
    });
    return logger.appStarted(port, prettyHost, url);
  }
  return logger.appStarted(port, prettyHost);
});
