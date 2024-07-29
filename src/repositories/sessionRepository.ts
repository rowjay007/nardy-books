import { ISession, SessionModel } from "../models/sessionModel";

export const createSession = async (
  sessionData: Partial<ISession>
): Promise<ISession> => {
  const session = new SessionModel(sessionData);
  await session.save();
  return session;
};

export const findSessionByToken = async (
  sessionToken: string
): Promise<ISession | null> => {
  return SessionModel.findOne({ sessionToken });
};

export const findSessionById = async (id: string): Promise<ISession | null> => {
  return SessionModel.findById(id);
};

export const findSessionsByUserId = async (
  userId: string
): Promise<ISession[]> => {
  return SessionModel.find({ userId });
};

export const updateSessionByToken = async (
  sessionToken: string,
  updateData: Partial<ISession>
): Promise<ISession | null> => {
  return SessionModel.findOneAndUpdate({ sessionToken }, updateData, {
    new: true,
  });
};

export const deleteSessionByToken = async (
  sessionToken: string
): Promise<boolean> => {
  const result = await SessionModel.findOneAndDelete({ sessionToken });
  return result !== null;
};

export const deleteExpiredSessions = async (): Promise<number> => {
  const result = await SessionModel.deleteMany({
    expiresAt: { $lt: new Date() },
  });
  return result.deletedCount || 0;
};
