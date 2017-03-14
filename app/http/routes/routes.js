import express from 'express';
const router = express.Router();
import allowCrossDomain from '../middlewares/allowCrossDomain';
router.use(allowCrossDomain);

router.get('/', (req, res) => {
  res.send('Birds home page');
});

router.get('/error', (req, res) => {
  throw new Error('My bad...');
});

export default router;