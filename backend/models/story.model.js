import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    expiresAt: {
      type: Date,
      // required: true,
    },
  },
  {
    timestamps: true,
    expireAfterSeconds: 86400,
  }
);
export const Story = mongoose.model("Story", storySchema);
