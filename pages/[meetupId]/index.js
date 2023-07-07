import { MongoClient,ObjectId } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetail(props){
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                name="description"
                content={props.meetupData.description}/>
            </Head>
            <MeetupDetails 
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description} />
        </Fragment>
        
    )
}

export async function getStaticPaths(){
    const client= await MongoClient.connect('mongodb+srv://iamprachigodase:prachi123@cluster0.khdv7h5.mongodb.net/meetups?retryWrites=true&w=majority')
    const db=client.db()
 
     const meetupsCollection=db.collection('meetups')

     const meetups= await  meetupsCollection.find({},{__id:1}).toArray()
     client.close()
    return {
        fallback:false,
        paths: meetups.map((meetup)=>({
            params:{meetupId:meetup._id.toString()}
        }))
        
            
        
    }
}

export async function getStaticProps(context){
    //fetch data for a meetup
    const meetupId=context.params.meetupId
    // console.log(meetupId)
    const client= await MongoClient.connect('mongodb+srv://iamprachigodase:prachi123@cluster0.khdv7h5.mongodb.net/meetups?retryWrites=true&w=majority')
    const db=client.db()
 
     const meetupsCollection=db.collection('meetups')

     
     const selectedMeetup= await meetupsCollection.findOne({
        _id:new ObjectId(meetupId)})
     client.close()
    return{
        props:{
            meetupData:{
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                image:selectedMeetup.image,
                description:selectedMeetup.description,
                address:selectedMeetup.address
            }
        }
    }
}

export default MeetupDetail;