const mongoose = require('mongoose');
require('mongoose-type-url');

var eventSchema = new mongoose.Schema({
    mainTitle: {
        type: String
    },
    eventTitle: {
        type: String
    },
    registrationLink: {
        type: mongoose.SchemaTypes.Url
    },
    eventStartDate: {
        type: Date
    },
    eventEndDate: {
        type: Date
    },
   
    eventDescription: {
        type: String
    },
    speakers: {
        type : Array , 
        default : []
    },
    moderators: {
        type : Array , 
        default : []
    },
    readingMaterial: {
        type: String
    },
    JoiningInfo: {
        //URLS
        type: mongoose.SchemaTypes.Url
    },
    organisers: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
        
    }
  }, {
      collection: 'events'
  });

mongoose.model('Event', eventSchema)