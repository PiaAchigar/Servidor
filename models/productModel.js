const { model, Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema(
  {
    code: {
      type:String,
      require:true
    },
    category: {
      type:String,
      require:true
    },
    name: {
      type:String,
      require:true
    },
    description: String,
    expirationDate: {
      type:Date,
      default: () => {
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        return sixMonthsFromNow;
      }
    },
    stock: Number,
    img: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"users",
      required:true
    }
  },
  {
    timestamps: true, // created_at, updated_at
  }
);

module.exports = model("products", productSchema);
