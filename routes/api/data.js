const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function(req, file, cb) {
    cb(null,'./uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Data = require('../../models/Data');

router.get('/', (req, res) => {
  Data.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
	Data.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/:id', (req, res) => {
	Data.findByIdAndUpdate(req.params.id)
    .then(data => {
      data.name = req.body.name;
      data.image = req.file.path;
      data.description = req.body.description;
      data.rating = Number(req.body.rating);
      data.price = Number(req.body.price);
      data.seller = req.body.seller;
      data.manufacturer = req.body.manufacturer;
      data.discount = Number(req.body.discount);

      data.save().then(dat => res.json(dat));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
	Data.findById(req.params.id)
   .then(data => data.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

router.post('/', upload.single('image'), (req, res, next) => {
  const newData = Data{
    name: req.body.name,
    image: req.file.path,
    description: req.body.description,
    rating: Number(req.body.rating),
    price: Number(req.body.price),
    seller: req.body.seller,
    manufacturer: req.body.manufacturer,
    discount: Number(req.body.discount)
  };
  
  newData.save().then(data => res.json(data));
});

module.exports = router;