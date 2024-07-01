import mongoose, { Document, Schema, Types } from "mongoose";

export interface INotification extends Document {
  message: string;
  user: Types.ObjectId;
  status: string;
  date: Date;
  email?: {
    to: string;
    subject: string;
    body: string;
  };
  sms?: {
    to: string;
    message: string;
  };
  push?: {
    deviceId: string;
    title: string;
    body: string;
  };
}

const NotificationSchema: Schema<INotification> = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
  date: { type: Date, default: Date.now },
  email: {
    to: { type: String },
    subject: { type: String },
    body: { type: String },
  },
  sms: {
    to: { type: String },
    message: { type: String },
  },
  push: {
    deviceId: { type: String },
    title: { type: String },
    body: { type: String },
  },
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
