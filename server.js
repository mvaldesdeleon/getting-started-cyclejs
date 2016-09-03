import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev';
import dev from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 3000;
const index = path.join(__dirname, 'index.html');

app.use(dev(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(hot(compiler));

app.get('*', (req, res) => {
    res.sendFile(index);
});

app.listen(port, err => {
    if (err) console.error(err);
    else console.info(`Webpack development server listening on port ${port}`);
});
