module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbPath: 'mongodb://admin:admin@ds227035.mlab.com:27035/sunidb'
    },
    production: {}
};