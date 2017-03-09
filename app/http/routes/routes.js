import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Birds home page');
});

router.get('/error', (req, res) => {
  throw new Error('My bad...');
});

export default router;