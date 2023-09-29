const mongoose =require('mongoose')

const appointmentSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    date:{type:String,required:true},
    serviceProvider:{type:mongoose.Schema.Types.ObjectId,ref:'worker-Saloon'},
})


module.exports =mongoose.model('appointment',appointmentSchema)