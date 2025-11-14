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

const BucketList = mongoose.model('BucketList', BucketlistSchema);

export async function getAllLists() {
  const list = await BucketList.find({});

  return list;
}
