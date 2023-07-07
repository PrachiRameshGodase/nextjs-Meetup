//our-domain.com/new-meetup

import { Fragment } from "react"
import Head from "next/head"
import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import { useRouter } from "next/router"

function NewMeetupPage(){
   const router= useRouter()
   async  function addMeetupHamdler(eneteredMeetupdata){
        console.log(eneteredMeetupdata)
        
        const response=await fetch('/api/new-meetup',{
            method:"POST",
            body:JSON.stringify(eneteredMeetupdata),
            headers:{
            'Content-Type':'application/json'
      }

        })
        const data =await response.json()

        console.log(data)

        router.push('/')

    }
    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta
                name="description"
                content="Add your own meetups & create amazing networking opportunities"/>
            </Head>
             <NewMeetupForm onAddMeetup={addMeetupHamdler}/>
        </Fragment>
       
    )
}

export default NewMeetupPage

