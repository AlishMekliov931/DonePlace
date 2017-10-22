const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    // app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    app.get('/orderStatus', controllers.product.orderStatusGet)
    app.post('/orderStatus', controllers.product.orderStatusPost)

    app.get('/order/:id', restrictedPages.isAuthed, controllers.product.orderGet)
    app.post('/order/:id', controllers.product.orderPost)

    app.get('/createProduct', controllers.product.createGet)
    app.post('/createProduct', controllers.product.createPost)

    app.get('/details/:id', controllers.product.details)

    app.get('/order/delete/:id', controllers.product.delete)
    app.get('/order/edit/:id', controllers.product.editGet)

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};