import mongoose, { Document, Schema } from "mongoose";

interface IPublisher extends Document {
  name: string;
  description: string;
  website: string;
  headquartersLocation: string;
  contactInformation: string;
}

const publisherSchema: Schema<IPublisher> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  headquartersLocation: { type: String, required: true },
  contactInformation: { type: String, required: true },
});

const Publisher = mongoose.model<IPublisher>("Publisher", publisherSchema);

export default Publisher;
