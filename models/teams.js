import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  // id: {
  //   type : String
  // },

  name: {
    type: String,
    required: [true, "Багийнхаа  нэрийг оруулна уу!"],
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  color: {
    type: String,
    required: true,
  },
});
const Team = mongoose.model("TeamModel", TeamSchema);
export default Team;
