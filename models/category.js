import mongoose from "mongoose";

//Changing schema means now changing its validation as well

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: { 
    type: String,
  },
});

export default mongoose.model("Category", categorySchema);