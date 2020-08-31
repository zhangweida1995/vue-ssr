# vue-ssr

## Project setup

```
npm install or yarn
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run start
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

src
│
├── App.vue
├── app.js # 通用 entry
├── router
│ ├── index.js
├── store
│ ├── index.js
├── entry-client.js # 仅运行于浏览器
└── entry-server.js # 仅运行于服务器
