import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  createdBy: { type: String, required: true },
  modifiedBy: { type: String, required: true },
  created: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  modified: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
});

categoriesSchema.pre("updateOne", async function updateOne(next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.set({ modified: new Date().toISOString() });
  await docToUpdate.save();
  next();
});

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
