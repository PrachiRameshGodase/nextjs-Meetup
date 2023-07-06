//our-domain.com/new-meetup

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
        
        <NewMeetupForm onAddMeetup={addMeetupHamdler}/>
    )
}

export default NewMeetupPage