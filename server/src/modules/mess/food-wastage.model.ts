import mongoose, { Schema } from "mongoose";

const foodWastageSchema = new Schema({
  hostelId: { type: Schema.Types.ObjectId, ref: "Hostel", required: true },
  date: { type: Date, required: true },
  mealType: { type: String, enum: ["BREAKFAST","LUNCH","SNACKS","DINNER"], required: true },
  studentsServed: { type: Number, min: 0, required: true },
  preparedKg: { type: Number, min: 0, required: true },
  wastedKg: { type: Number, min: 0, required: true },
  notes: { type: String, trim: true, default: "" },
}, { timestamps: true });

foodWastageSchema.index({ hostelId: 1, date: -1 });
export const FoodWastage = mongoose.model("FoodWastage", foodWastageSchema);
