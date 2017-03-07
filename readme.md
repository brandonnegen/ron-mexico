# Commands
```bash
yarn dev-server # run the nodemon server
yarn babel somethig.js # execute file using babel-node
yarn mocha # run mocha tests
```

# Babel
I love the async/await es7 feature, so I use this plugin : babel-plugin-transform-async-to-generator.
Because I don't like the require, it reminds me the old php code, I prefer the import es6, so I use the babel-plugin-transform-es2015-modules-commonjs plugin to transforms my import to require, which supported by v8 engine.

# Using https without nginx
When I'am develop an application, I like use the nodejs http core to avoid nginx or apache. It's more "easy".
But, to avoid security issue I need HTTPS (especially for secure cookies) even in developement.
Good news, nodejs support https.

## Generate a self signed certificate
It's straightforward!
```bash
# Go into the keys folder
cd keys

# answer to the questions
openssl req -x509 -newkey rsa:2048 -keyout keypas.pem -out cert.pem -days 365

# delete the passphrase
openssl rsa -in keypas.pem -out key.pem

# delete the key with passphrase
rm keypas.pem
```

