import mongoose from 'mongoose';
import { mongoConnect, mongoDisconnect } from '../../src/access';

jest.mock('mongoose');

describe('Get Access', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should reuse connection', async () => {
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, 'connect')
      .mockImplementationOnce(async () =>
        Promise.reject(new Error('connect error'))
      );

    expect.assertions(1);
    try {
      await mongoConnect();
    } catch (error) {
      expect(mongooseConnectSpyOn).toBeCalledWith(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 15000,
      });
    }
  });

  it('should reuse connection', async () => {
    const connection = 'connected';
    const mongooseConnectSpyOn = jest
      .spyOn(mongoose, 'connect')
      .mockImplementationOnce(async () => Promise.resolve(connection));

    const conn = await mongoConnect();
    const conn2 = await mongoConnect();
    expect(conn).toStrictEqual(conn2);
    expect(mongooseConnectSpyOn).toBeCalledWith(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 15000,
    });
    expect(mongooseConnectSpyOn).toBeCalledTimes(1);
  });

  it('should disconnect', async () => {
    mongoose.connection = {
      close: jest.fn().mockImplementationOnce(async () => Promise.resolve()),
    };
    await mongoDisconnect();

    // second time should not call close
    await mongoDisconnect();

    expect(mongoose.connection.close).toBeCalledTimes(1);
  });
});
