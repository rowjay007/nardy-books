import mongoose, { Document, Schema, Types } from "mongoose";

export interface INotification extends Document {
  message: string;
  user: Types.ObjectId;
  status: string;
  date?: Date;
}

const NotificationSchema: Schema<INotification> = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "unread" },
});

NotificationSchema.pre<INotification>("save", function (next) {
  if (!this.date) {
    this.date = new Date();
  }
  next();
});

const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);

export default Notification;
