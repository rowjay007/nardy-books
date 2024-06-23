import { isValid, parse } from "date-fns";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface INotification extends Document {
  message: string;
  user: Types.ObjectId;
  status: string;
  date: Date | string;
}

const NotificationSchema: Schema<INotification> = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "unread" },
  date: { type: Date, default: Date.now },
});

NotificationSchema.pre<INotification>("save", function (next) {
  if (typeof this.date === "string") {
    const parsedDate = parse(this.date, "dd-MM-yyyy", new Date());
    if (isValid(parsedDate)) {
      this.date = parsedDate;
    } else {
      return next(new Error("Invalid date format, should be DD-MM-YYYY"));
    }
  }
  next();
});

const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);

export default Notification;
