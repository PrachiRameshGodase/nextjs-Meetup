//our-domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm"

function NewMeetupPage(){
    const addMeetupHamdler=(eneteredMeetupdata)=>{
        console.log(eneteredMeetupdata)

    }
    return (
        
        <NewMeetupForm onAddMeetup={addMeetupHamdler}/>
    )
}

export default NewMeetupPage