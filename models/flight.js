const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let destinationSchema = new Schema(
    {
      airport: {
        type: String,
        enum: ['ATL', 'AUS', 'DFW', 'DEN', 'LAX', 'SAN']
      },
      arrival: {
        type: Date
      },
    },
    {
      timestamps: true
    });

let flightSchema = new Schema({
    airline: { 
        type: String, 
        enum: ['American', 'Southwest', 'United'] },
    airport: {
        type: String, 
        enum: ['ATL', 'AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    flightNo: { 
        type: Number, max: 9999, min: 10 
    },
    departs: {
        type: Date,
        default: function () {
          return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        },
      },
    },
    {
      timestamps: true,
    });

module.exports = mongoose.model('Flight', flightSchema);