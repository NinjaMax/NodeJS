const express = require('express');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const MongoStore =require('connect-mongodb-session')(session);
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRouters = require('./routes/add');
const cardRoutes = require('./routes/card');
const coursesRoutes = require('./routes/courses');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const ordersRoutes = require('./routes/orders');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/error');
const fileMiddleware = require('./middleware/file');
const keys = require('./keys');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./utils/hbs-helpers'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

const store = new MongoStore({
    collection: 'session',
    uri: keys.MONGODB_URI
});


const password = 'wquJbgh3*rrV_7N';



app.engine('hbs', hbs.engine); //regestriruem Handle bars
app.set('view engine', 'hbs'); //ustanavlivaem ispolzuem Handlebars
app.set('views', 'views');

// app.use(async (req, res, next) => {
//     try {
//         const user = await User.findById('61437b201af46fffa3030c30');
//         req.user = user;
//         next();
//     } catch (e) {
//         console.log(e);
//     }   
// });

app.use(express.static(path.join(__dirname,'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(fileMiddleware.single('avatar'));
app.use(csrf());
app.use(flash());
app.use(helmet());
app.use(compression());
app.use(varMiddleware);
app.use(userMiddleware);
app.use('/', homeRoutes);
app.use('/add', addRouters);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use(errorHandler);
//app.get('/', (req, res) => {
    //res.status(200); // ne obyazatelno
    //res.sendFile(path.join(__dirname, 'views', 'index.html'));
   
//});
//app.get('/add', (req, res) => {
    //res.sendFile(path.join(__dirname, 'views', 'about.html'));
  
//});

//app.get('/courses', (req, res) => {
  
//});
const PORT = process.env.PORT || 3000;
async function start() {
try {       
    
    await mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true});

    // const candidate = await User.findOne();
    // if(!candidate) {
    //     const user = new User({
    //         email: 'unitigrand@gmail.com',
    //         name: 'Max',
    //         cart: {items: []}
    //     });
    //     await user.save();
    // }
    app.listen(PORT, () => {
        console.log(`Server is runnig on port ${PORT}`);
    });
} catch (e) {
    console.log(e);
    }  
}
start();



