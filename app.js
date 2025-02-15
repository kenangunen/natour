const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//* 1) MIDDLEWARES
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

/**
 * Bu middleware ile gelen isteklere date bilgisi yazdırdık.
 * Ve bunu getAllTours (requestedAt) ile client'a gönderdik.
 * */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//* 2) ROUTES
/**
 * /api/v1/tours rout'unu tourRouter middleware'ine değişkenine bağladık.
 * Artık tourRouter'ın kendi alt router'larını tanımlayabiliriz.
 */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/**
 * Belirtilen hiçbir router'a uymayan istekler için 404 hatası döndürür.
 * Tüm raouter'larına altına yazarak hiç birine girmeyenlerin buraya girmesini sağladık.
 *  */
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
