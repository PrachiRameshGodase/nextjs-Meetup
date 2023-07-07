import { MongoClient } from "mongodb";

//api/new-meetup
//POST/api/new-meetup

async function Handler(req,res){
    // console.log(req.body)
    try {
   if(req.method=="POST"){
    const data=req.body
    // const {title,image,address,description}=data

   const client= await MongoClient.connect('mongodb+srv://iamprachigodase:prachi123@cluster0.khdv7h5.mongodb.net/meetups?retryWrites=true&w=majority')
   const db=client.db()

    const meetupsCollection=db.collection('meetups')
    const result=await meetupsCollection.insertOne(data)
    // console.log(result)

    client.close();
   res.status(201).json({message:"Meetup inserted"})

   }
   

} catch (error) {
    console.log(error);

   
    // res.status(201).json({message:"Meetup inserted"})
   }

} 

export default Handler