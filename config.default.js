'use strict';

// var url = require('url');

// Accesing Bluemix variable to get MongoDB info
var mongo = {
    db:       'neo',
    host:     '0.0.0.0',
//    host:     '10.0.2.26 ',
    password: '',
    port:     27017,
    ssl:      false,
    url:      'mongodb://0.0.0.0:27017/db',
    username: ''
};
var meConfigMongodbServer = false;

module.exports = {
    mongodb: {
        server: (meConfigMongodbServer.length > 1 ? meConfigMongodbServer : meConfigMongodbServer[0]) || mongo.host,
        port:    mongo.port,

        ssl:  mongo.ssl,
        sslValidate: true,
        sslCA:  [],
        autoReconnect: true,
        poolSize: 4,
        admin: false,
        auth: [
            {
                database: mongo.db,
                username:  mongo.username,
                password:  mongo.password
            }
        ],
        adminUsername: '',
        adminPassword:  '',
        whitelist: [],
        blacklist: []
    },

    site: {
        baseUrl:'/',
        cookieKeyName: 'mongo-express',
        cookieSecret:      'cookiesecret',
        host:             '0.0.0.0',
        port:             8158,
        requestSizeLimit:  '50mb',
        sessionSecret:    'sessionsecret',
        sslCert:          '',
        sslEnabled:       false,
        sslKey:           ''
    },


    useBasicAuth: false,

    basicAuth: {
        username:'neolsAdmin',
        password:'neols123'
    },

    options: {
        console: true,
        documentsPerPage: 10,
        editorTheme: process.env.ME_CONFIG_OPTIONS_EDITORTHEME || 'rubyblue',
        maxPropSize: (100 * 1000),  // default 100KB
        maxRowSize: (1000 * 1000),  // default 1MB
        cmdType: 'eval',
        subprocessTimeout: 300,
        readOnly: false,
        collapsibleJSON: true,
        collapsibleJSONDefaultUnfold: 1,
        gridFSEnabled: false,
        logger: {}
    },
    defaultKeyNames: {

    }
};