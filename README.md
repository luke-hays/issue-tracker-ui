# Frontend Boilerplate Packages

## Webpack

### Main

webpack
webpack-cli
webpack-dev-server
webpack-merge

### Babel

@babel/core
@babel/plugin-proposal-class-properties
@babel/preset-env
babel-loader

### Plugins

clean-webpack-plugin
css-minimizer-webpack-plugin
html-webpack-plugin
mini-css-extract-plugin

### CSS

css-loader
node-sass
postcss-loader
postcss-preset-env
sass
sass-loader
style-loader

## React

### Main

react
react-dom
react-router-dom

### Webpack Babel

@babel/preset-react

## Typescript

### Main

typescript

### Webpack Loader

ts-loader

### Types (Dunno what I'll need yet)

@types/jest
@types/node
@types/react
@types/react-dom
@types/react-router-dom

## Jest/ReactTestLibrary

babel-jest
jest
@testing-library/react
@testing-library/jest-dom
@testing-library/user-event
@types/jest
@babel/preset-typescript

Set up jest config and setupTests file, use tsx for files
["@babel/preset-react", {"runtime": "automatic"}],
jest-environment-jsdom and setting jsdom testEnv

## Playwright

@playwright/test
add playwright config, scripts, and make sure jest doesnt attempt to run playwright tests and vice versa. works well out of the box

## Tailwind
tailwindcss
postcss
autoprefixer

This has jacked my config up but works now


## Eslint
eslint
run @eslint/config

    "@typescript-eslint/eslint-plugin": "^5.23.0",
    "@typescript-eslint/parser": "^5.23.0",
        "eslint": "^8.15.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-jsx-a11y": "^6.5.1",
    "eslint-plugin-playwright": "^0.9.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-react": "^7.29.4",
    "eslint-plugin-react-hooks": "^4.5.0",

    most are install with config init

    eslint-webpack-plugin
    const ESLintPlugin = require('eslint-webpack-plugin');
    add to webpack config
    ignore css

## Prettier
prettier (package)

## graphql
graphql
apolloclient