const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const isDirectory = source => fs.lstatSync(source).isDirectory();
const isNotDirectory = source => !fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
const getFiles = source =>
  fs.readdirSync(source).map(name => path.join(source, name)).filter(isNotDirectory);

module.exports = {
  base: '/',
  head: [
    ['link', { rel: "icon", href: "/favicon.png"}],
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'swagger-stats',
      description: 'API Telemetry and APM',
    }
  },
  markdown: {
    lineNumbers: true
  },
  serviceWorker: true,
  themeConfig: {
    repo: 'slanatech/swagger-stats',
    docsDir: 'docs',
    editLinks: true,
    sidebarDepth: 1,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'Components',
            link: '/components/'
          },
          {
            text: 'Changelog',
            link: 'https://github.com/dashblocks/blob/dev/CHANGELOG.md'
          }
        ],
        sidebar: {
          '/guide/': ['/guide/', 'api','quickstart','conf','prometheus'],
          '/components/': getComponentsSidebar()
            /*[
            {
              title: 'Components',
              collapsable: false,
              children: ['']
            },
            {
              title: 'd3',
              collapsable: true,
              children: ['d3/DbHorizon.vue']
            }
          ]*/
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }
};

function getComponentsSidebar() {
  let result = [
    {
      title: 'Components',
      collapsable: false,
      children: ['']
    }
  ];

  // Enumerate all folders
  let dirs = getDirectories(path.join(__dirname,'..','components'));
  console.log(`Directories: ${JSON.stringify(dirs)}`);
  for(let dir of dirs){
    let dirname = path.basename(dir);
    let files = getFiles(dir);
    let children = [];
    for(let file of files){
      let filename = path.basename(file);
      children.push(`${dirname}/${filename}`);
    }

    result.push(
      {
        title: dirname,
        collapsable: true,
        children: children
      }
    );
  }

  return result;
}
