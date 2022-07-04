import { Fragment, useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
const DUMMY_MEETUPS = [
    {id:'m1',title:'First Meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg',
    address:'3, C-1273 Mumbai',description:'This is first meetup'},
    {id:'m2',title:'Second Meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg',
    address:'3, C-73 Delhi',description:'This is second meetup'}
]
function HomePage(props){
    // const [loadedMeetup, setLoadedMeetup] = useState([]);
    // useEffect(()=>{
    //     setLoadedMeetup(DUMMY_MEETUPS);
    // },[])
    return (
        <Fragment>
            <Head>
                <title>React meetup</title>
                <meta name='description'
                content='Browse a huge list of highly active React component'/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}
// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     return {
//         props:{meetups:DUMMY_MEETUPS}
//     };
// }
export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb+srv://Neha:sinha@cluster0.eahb5lo.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetup');
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props:{
            meetups:meetups.map((meetup)=> ({
                id:meetup._id.toString(),title:meetup.data.title,address:meetup.data.address,image:meetup.data.image
            }))
        },
        revalidate:10
    };
}
export default HomePage;