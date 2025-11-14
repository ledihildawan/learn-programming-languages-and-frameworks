import mongoose from 'mongoose';

const BucketlistSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
    enum: ['High', 'Medium', 'Low'],
  },
});

export const BucketList = mongoose.model('BucketList', BucketlistSchema);

export async function getAllLists() {
  const list = await BucketList.find({});

  return list;
}

export async function addList(newList) {
  const list = new BucketList(newList);

  list.save();
}

export async function deleteListById(id) {
  await BucketList.deleteOne({ _id: id });
}
