import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList"
import { Fragment } from "react";


function HomePage(props){
  
    return(
      <Fragment>
        <Head>
          <title>React Meetups</title>
          <meta
          name="description"
          content="Browse a huge list of highly active React meetups"/>
        </Head>
        <MeetupList meetups={props.meetups}/>
      </Fragment> 
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
    const client= await MongoClient.connect('mongodb+srv://iamprachigodase:prachi123@cluster0.khdv7h5.mongodb.net/meetups?retryWrites=true&w=majority')
    const db=client.db()
 
     const meetupsCollection=db.collection('meetups')

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

