/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.middleware';
import multer from 'multer';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('common'));

const upload = multer({
  fileFilter(_req, file, cb) {
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.post('/', upload.single('file'), (req, res, next) => {
  try {
    const file = req.file;
    res.status(201).json({
      message: 'File uploaded successfully',
      file,
    });
  } catch {
    next();
  }
});

app.use(errorHandler);

export default app;
