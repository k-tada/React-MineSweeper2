var dest = './www';
var src = './src';

module.exports = {
  dest: dest,

  js: {
    src: src + '/js/**',
    dest: dest + '/js',
    uglify: false
  },

  webpack: {
    entry: src + '/js/app.js',
    output: {
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        }
      ]
    }
  }
}
