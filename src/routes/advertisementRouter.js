import express from 'express';
import { AdvertisementModule } from '../module/AdvertisementModule.js';
import { storage } from '../middleware/file.js';
import multer from 'multer';
import { isAuthenticated } from '../middleware/passport.js';

export const router = express.Router();

const advertisementModule = new AdvertisementModule();

router.get('/', async (req, res) => {
  console.log('advertisements');
  const advertisements = await advertisementModule.find().catch((err) => {
    console.log(err);
    res.json({ error: err });
  });
  console.log(advertisements);

  res.json(advertisements);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const advertisement = await advertisementModule.findById(id);
    console.log(advertisement);
    res.json(advertisement);
  } catch (e) {
    res.json({ error: e });
  }
});

router.post(
  '/',
  isAuthenticated,
  multer({ storage: storage }).fields([{ name: 'images', maxCount: 2 }]),
  async (req, res) => {
    const data = req.body;
    data.userId = req.user._id;

    data.images = [];

    if (req.files) {
      for (let i = 0; i < req.files.images.length; i++)
        data.images.push(req.files.images[i].path);
    }

    data.createdAt = Date.now();
    data.updatedAt = Date.now();
    data.isDeleted = false;

    const advertisement = await advertisementModule.create(data);

    console.log(advertisement);

    data.id = advertisement._id;
    data.user = { id: req.user._id, name: req.user.name };
    data.createdAt = advertisement.createdAt.toISOString();
    data.updatedAt = advertisement.updatedAt.toISOString();

    res.status(201);
    res.json({ data: data, status: 'ok' });
  }
);

router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const advertisement = await advertisementModule.findById(req.params.id);

  console.log(advertisement, req.user._id, advertisement.userId);
  console.log(req.user._id.equals(advertisement.userId));
  if (!req.user._id.equals(advertisement.userId)) {
    console.log('здесь');
    res.status(403).json({
      error: 'Нет прав на это действие',
      status: 'error',
    });
  }
  
  await advertisementModule.remove(id).catch((err) => {
    res.status(500).json(err);
  });

  res.status(200);
  res.json({ deleted: id });
});
