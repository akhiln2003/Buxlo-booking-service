import mongoose from "mongoose";

// Interface for availability attributes (for creation)
interface AvailabilityAttributes {
  mentorId: string;
  date: string;
  description?: string;
  startTime: string;
  salary: number;
  duration: number;
  status: "available" | "booked" | "cancelled" | "pending";
  isBooked: boolean;
}

// Interface for availability document (instance of saved document)
interface AvailabilityDocument extends mongoose.Document {
  mentorId: string;
  date: string;
  description?: string;
  startTime: string;
  duration: number;
  salary: number;
  status: "available" | "booked" | "cancelled" | "pending";
  isBooked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for availability model (collection)
interface AvailabilityModel extends mongoose.Model<AvailabilityDocument> {
  build(attrs: AvailabilityAttributes): AvailabilityDocument;
}

// Mongoose schema
const availabilitySchema = new mongoose.Schema(
  {
    mentorId: {
      type: String,
      ref: "Mentor",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 50,
    },

    status: {
      type: String,
      enum: ["available", "booked", "cancelled", "pending"],
      default: "available",
      index: true,
    },
    isBooked: {
      type: Boolean,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    timestamps: true,
  }
);

// Static build method
availabilitySchema.statics.build = (attrs: AvailabilityAttributes) => {
  return new AvailabilitySchema(attrs);
};

// Create and export the model
const AvailabilitySchema = mongoose.model<
  AvailabilityDocument,
  AvailabilityModel
>("Availability", availabilitySchema);

export { AvailabilitySchema };
