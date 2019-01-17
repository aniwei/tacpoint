## Getting Started

You need to install nodejs before you can start the project.This project is a SPA(single page application) based on the react and react-router framework.


### Prerequisites

- nodejs (v8.3.0)
- npm

### Install nodejs dependencies

With npm

```bash
$ cd ./path/to/tacpoint/
$ npm install
```

### Startup

- development

```bash
$ cd ./path/to/tacpoint/
$ npm start 
```

- production
```bash
$ cd ./path/to/tacpoint/
$ npm run build 
```

### Project structure

```
├── README.md
├── data
│   ├── categories.json
│   ├── clients.json
│   ├── message.json
│   ├── project.json
│   └── projects.json
├── html
│   ├── about.html
│   ├── contact.html
│   ├── detail.html
│   ├── home.html
│   └── login.html
├── index.html
├── package-lock.json
├── package.json
├── src
│   ├── Context.js
│   ├── components
│   ├── contants.js
│   ├── index.js
│   └── pages
├── static
│   ├── css
│   ├── image
│   └── js
├── webpack.config.js
└── webpack.production.config.js
```

1. src 
The src directory is the project JS source file that you can change as needed.

2. The static directory is a static file directory that contains all CSS, js (compiled and compressed), and image files. So you can change style as needed.

3. The data directory contains all mock data.And You must follow the json data structure or the project will not allow it.






