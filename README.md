# Fraction calculator + Comments

- [Description](#Description)
- [Technology](#Technology)
- [Project setup](#Project-setup)
- [Contributors](#Contributors)

## Description

Single-page web application with two sections: Fraction calculator and Comment list (websocket).

Every sections has own url. Sections are implemented as loadable modules.

### Fraction calculator

To the left of the "=" sign there is an expression.

Minimum set of operators +-*/. To the right of the sign there is an equal result in the form of an irreversible ordinary fraction.

If you click on the add fraction link, one sign and one more fraction should appear in the expression on the left.

The expression must be recalculated at any change in the data.

### Comment list

The page has an input and a button to add a comment next to it (clicking on this button will generate a request to the websocket server to add a comment).

The page contains a list of 10 different comments. Next to each word there is a "delete" button (clicking on this button will generate a request to the server to delete the comment).

At the beginning of each request, indicate only the request number.

The server response also contains only the request number.

## Technology

- [vue](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run tests
```
npm run jest
```

### Lints and fixes files
```
npm run lint
```

## Contributors

Fomin Maxim <fominmax@inbox.ru>
