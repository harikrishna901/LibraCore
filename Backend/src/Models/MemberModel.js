const mongoose = require("mongoose");
const { optional } = require("zod");

const MemberSchema = new mongoose.Schema(
  {
    PhoneNo: {
      type: String,
      required: true,
      trim: true,
      unique:true,
      match: /^\+?[1-9]\d{7,14}$/
    },

    DateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Date of birth cannot be in the future"
      }
    },

    Gender: {
      type: String,
      enum: ["Male", "Female", "Non-binary", "Prefer not to say"],
      default: "Prefer not to say"
    },
    AddressID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required:true
    }
  },
  {
    timestamps: true
  }
);
const AddressSchema = new mongoose.Schema({
     MemberID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member",
        required:true
    },
    address: {
      Country: {
        type: String,
        required: true,
        trim: true
      },

      City: {
        type: String,
        required: true,
        trim: true
      },

      State: {
        type: String,
        required: true,
        trim: true
      },

      PostalCode: {
        type: String,
        required: true,
        trim: true
      },

      Street: {
        type: String,
        trim: true,
        maxlength: 200
      },

      Landmark: {
        type: String,
        trim: true,
        maxlength: 200
      }
    }
  },
  {
    timestamps:true
  });
const MemberModel = mongoose.model("MemberModel",MemberSchema,"Member");
const AddressModel = mongoose.model("AdressModel",AddressSchema,"Address");
module.exports = { MemberModel , AddressModel };

