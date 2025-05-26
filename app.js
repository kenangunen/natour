const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewsRoutes');

const app = express();

//* 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  // istekleri loglamak için kullanılır.
  app.use(morgan('dev'));
}

// Limit requests from the same IP
const limiter = rateLimit({
  max: process.env.RATE_LIMIT_MAX_REQUESTS,
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  message: 'Too many requests from this IP, please try again in an hour',
});

// Limit requests from the same IP address
app.use('/api', limiter);

// Middleware to parse incoming JSON requests
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      // Allowed doublecated parameters
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Middleware to serve static files
app.use(express.static(`${__dirname}/public`));

// Middleware to log the request time
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
app.use('/api/v1/reviews', reviewRouter);

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
