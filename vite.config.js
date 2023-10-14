/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import { createHtmlPlugin } from 'vite-plugin-html';
import externalGlobals from 'rollup-plugin-external-globals';
// import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // visualizer(),
    // manualChunksPlugin(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/css`;
          },
        },
      ],
    }),
    createHtmlPlugin({
      template: './index.html',
      inject: {
        tags: [
          // {
          //   injectTo: 'head',
          //   tag: 'script',
          //   attrs: {
          //     src: 'https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js',
          //   },
          // },
          // {
          //   injectTo: 'head',
          //   tag: 'script',
          //   attrs: {
          //     src: 'https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
          //     defer: true,
          //   },
          // },
          // {
          //   injectTo: 'head',
          //   tag: 'script',
          //   attrs: {
          //     src: 'https://cdn.bootcdn.net/ajax/libs/react-router-dom/6.15.0/react-router-dom.production.min.js',
          //   },
          // },
          {
            injectTo: 'head',
            tag: 'script',
            attrs: {
              src: 'https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.min.js',
              defer: true,
            },
          },
        ],
      },
    }),
  ],
  build: {
    // 使用 rollup-plugin-external-globals 插件，将 React、React DOM 和 React Router DOM 声明为外部全局变量
    rollupOptions: {
      plugins: [
        externalGlobals({
          // react: 'React',
          // 'react-dom': 'ReactDOM',
          // 'react-router-dom': 'ReactRouterDOM',
          'axios': 'axios'
        }),
      ],
      output: {
        entryFileNames: `entry/[name][hash].js`,
        chunkFileNames: `chunk/[name][hash].js`,
        assetFileNames: `assets/[name][hash].[ext]`,
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor" //代码分割为第三方包
          }
          if (id.includes("src/container")) {
            return "container-modules" //代码分割为业务模块
          }
        }
      }
    },
  },
  css: {
    modules: {
      localsConvention: 'dashesOnly',
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      utils: path.resolve(__dirname, 'src/utils'),
      config: path.resolve(__dirname, 'src/config'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://finance.xsnowholy.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
