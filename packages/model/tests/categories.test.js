/* eslint-disable no-underscore-dangle */
import { mongoConnect, mongoDisconnect } from "../src";
import Categories from "../src/entities/Categories";
import categories from "./fixtures/categories.json";

describe("Model", () => {
  beforeAll(async () => {
    await mongoConnect();
    await Categories.deleteMany({});
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  it(`should save categories`, async () => {
    await Categories.insertMany(categories);
    const res = await Categories.find({});
    expect(res).toHaveLength(8);
    expect(res[0]).toHaveProperty("created");
    expect(res[0]).toHaveProperty("modified");

    await Categories.updateOne({ id: res[0].id }, { $set: { name: "Edited" } });
    const item = await Categories.findOne({ id: res[0].id });
    expect(item.name).toBe("Edited");
    expect(item.modified).not.toBe(res[0].modified);
  });
});
