import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
function NewMeetupPage(){
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData){
        const res = await fetch('/api/new-meetup',{
            method:'POST',body:JSON.stringify(enteredMeetupData),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await res.json();
        console.log(data);
        router.push('/');
    }
    return (
        <Fragment>
            <Head>
            <title>Add meetup</title>
            <meta name='description'
            content='Add own meetups'/>
            </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    )
}
export default NewMeetupPage;