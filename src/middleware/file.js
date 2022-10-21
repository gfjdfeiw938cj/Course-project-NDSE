import multer from 'multer';

export const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

export const fileFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(png|jpg|jpeg|gif)&/)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
