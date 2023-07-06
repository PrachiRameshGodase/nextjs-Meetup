import { MongoClient } from "mongodb";
// import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList"

const DUMMy_MEETUPS=[{
    id: "m1",
  title: "Meetup 1",
  image:
    "https://images.unsplash.com/photo-1618823617088-b170e5d7501a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1183&q=80",
  address: "London",
  description: "This is the First meetup",
},
{
    id: "m2",
    title: "Meetup 2",
    image:
      "https://plus.unsplash.com/premium_photo-1671734045770-4b9e1a5e53a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    address: "Birmingham",
    description: "This is theSecond meetup",
  },]
function HomePage(props){
    // const [lodedMeetups,setlodedMeetups]=useState([])
    // useEffect(()=>{
    //     setlodedMeetups(DUMMy_MEETUPS)
    // },[])

    
    return(
        <MeetupList meetups={props.meetups}/> 
    )
}

// export async function getServerSideProps(context){
//     const req=context.req;
//     const res=context.res;
//     //data update after request
//     return {

//         props:{
//             meetups:DUMMy_MEETUPS
//         }

//     }
// } 


export async function getStaticProps(){
    //fetching data
    const client= await MongoClient.connect('mongodb+srv://iamprachigodase:prachi123@cluster0.khdv7h5.mongodb.net/meeting?retryWrites=true&w=majority')
    const db=client.db()
 
     const meetupsCollection=db.collection('meeting')

     const meetups=await meetupsCollection.find().toArray()

     client.close()
    return{
    props:{
      meetups: meetups.map(meetup=>({
        image:meetup.image,
        title:meetup.title,
        address:meetup.address,
        description:meetup.description,
        id:meetup._id.toString()
      }))
    },
    revalidate: 1
    };
  }
export default HomePage;