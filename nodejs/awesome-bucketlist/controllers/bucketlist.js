import express from 'express';
import * as BucketList from './../models/list.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const list = await BucketList.getAllLists();

    res.json({
      success: true,
      list,
    });
  } catch (error) {
    res.json({ success: false, message: `Failed to load all list. Error: ${error}` });
  }
});

router.post('/', (req, res, next) => {
  res.send('POST');
});

router.delete('/:id', (req, res, next) => {
  res.send('DELETE');
});

export default router;
