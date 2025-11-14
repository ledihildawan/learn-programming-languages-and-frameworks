import express from 'express';
import { addList, deleteListById, getAllLists } from './../models/list.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const list = await getAllLists();

    res.json({
      success: true,
      list,
    });
  } catch (error) {
    res.json({ success: false, message: `Failed to load all list. Error: ${error}` });
  }
});

router.post('/', async (req, res, next) => {
  try {
    await addList({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    });

    res.json({ success: true, message: 'Added successfully.' });
  } catch (error) {
    res.json({ success: false, message: `Failed to create a new list. Error: ${error}` });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteListById(req.params.id);

    res.json({ success: true, message: 'Deleted successfully.' });
  } catch (error) {
    res.json({ success: false, message: `Failed to delete the list. Error: ${error}` });
  }
});

export default router;
