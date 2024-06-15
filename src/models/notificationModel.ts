import mongoose, { Document, Schema, Types } from "mongoose";

interface INotification extends Document {
  message: string;
  user: Types.ObjectId; 
  status: string;
  date: Date;
}

const NotificationSchema: Schema<INotification> = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "unread" },
  date: { type: Date, default: Date.now },
});

const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);

export default Notification;
