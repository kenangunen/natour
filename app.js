const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//* 1) Middlewares
if (process.env.NODE_ENV === 'development') {
  // istekleri loglamak için kullanılır.
  app.use(morgan('dev'));
}

/**
 * Express ile oluşturulan Node.js uygulamalarında gelen isteklerin gövdesini (body)
 * JSON formatında ayrıştırmak (parse etmek) için kullanılır.
 */
app.use(express.json());
/**
 * BU şekilde proje dizinindeki static dosyalara tarayıcıdan erişilebilir.
 * public dosyasındaki statik dosyalara erişmek için kullanılan middleware.
 * Örneğin bu middleware sayesinde http://127.0.0.1:3000/overview.html url'i overview.html
 * dosyasını tarayıcada görüntüleyebildik.
 */
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

/**
 * Bu middleware ile gelen isteklere date bilgisi yazdırdık.
 * Ve bunu getAllTours (requestedAt) ile client'a gönderdik.
 * */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//* 3) ROUTES
/**
 * /api/v1/tours rout'unu tourRouter middleware'ine değişkenine bağladık.
 * Artık tourRouter'ın kendi alt router'larını tanımlayabiliriz.
 */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
