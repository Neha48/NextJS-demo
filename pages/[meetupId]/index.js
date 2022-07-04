import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from 'next/head';
import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetails(props){
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}/>
            </Head>
            <MeetupDetail image={props.meetupData.image}
            alt='First Meetup' title={props.meetupData.title} address={props.meetupData.address}
            description={props.meetupData.description}/>
        </Fragment>
    );
}
export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://Neha:sinha@cluster0.eahb5lo.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetup');
    const meetups = await meetupsCollection.find({},{_id:1}).toArray();
    client.close();
    return {
        fallback:false,
        paths:meetups.map(meetup => ({
            params:{meetupId:meetup._id.toString()},
        }))
    }
}
export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://Neha:sinha@cluster0.eahb5lo.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetup');
    const meetup = await meetupsCollection.findOne({_id:ObjectId(meetupId),});
    client.close();
    console.log(meetup);
    return {
        props:{
            meetupData:{id:meetup._id.toString(),
            title:meetup.data.title,address:meetup.data.address,
            image:meetup.data.image,description:meetup.data.description
        }}
    }
}
export default MeetupDetails;