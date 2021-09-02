const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid Email");
          }
        }
      },

      mobile: {
        type: Number
        
      },
      address:{
          type:String,
          required:true
      }


    });
    
const userModel = new mongoose.model("users", userSchema);

module.exports = userModel;