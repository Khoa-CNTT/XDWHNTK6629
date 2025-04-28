import mongoose from "mongoose";

const tutorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    subjects: [
      {
        name: { type: String, required: true },
        description: { type: String },
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced", "all-levels"],
          default: "all-levels",
        },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        from: { type: Date },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    experience: [
      {
        title: { type: String },
        company: { type: String },
        from: { type: Date },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    certifications: [
      {
        title: { type: String },
        issuer: { type: String },
        year: { type: Number },
      },
    ],
    teachingMethods: {
      type: [String],
      enum: ["online", "in-person", "both"],
      default: ["online"],
    },
    availability: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
        },
        startTime: { type: String }, // format: "HH:MM" in 24-hour
        endTime: { type: String }, // format: "HH:MM" in 24-hour
      },
    ],
    hourlyRate: {
      type: Number,
      min: 0,
    },
    profilePicture: {
      type: String,
    }, // URL to image
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    languages: [
      {
        language: { type: String },
        proficiency: {
          type: String,
          enum: ["basic", "conversational", "fluent", "native"],
        },
      },
    ],
    location: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);
