const mongoose =require ('mongoose')

const workerSchema = mongoose.Schema({
    worker :{type:String,required:true},
    workId :{type:String,required:true},
    Image :{type:String,required:true},

    price :{type:String,required:true}
})


module.exports = mongoose.model("worker-Saloon",workerSchema)