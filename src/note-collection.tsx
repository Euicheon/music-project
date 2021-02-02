import React from "react";
import firebase from './firebase'
import { Divider } from 'antd';
import './note-collection.css'

var db = firebase.firestore();
interface noteCollectionProps {}

class NoteCollection extends React.Component<noteCollectionProps, any> {
  constructor(props: noteCollectionProps) {
    super(props);

    this.ref = db
      .collection("videos")
      .doc("testvideo1")
      .collection("note")
      .orderBy("videoTimestamp");
    this.unsubscribe = null;
    this.state = {
      collection: [],
    };
  }
  ref: any;
  unsubscribe: any;

  Notecomponent({ note }: any) {
    const videoTime_num: number = note.videoTimestamp;
    const min_val: number = Math.floor(videoTime_num / 60);
    const sec_val: number = videoTime_num % 60;
    return (
      <>
        <div className='notecategory'>
          <div>{note.category}</div>
          <div>{min_val}:{sec_val}</div>
        </div>
        <div className='singlenote'>
          <b>
             &nbsp;&nbsp; {note.userId}
          </b>
          <br />
          {note.content}
          &nbsp;
        </div>
      </>
    );
  }

  onCollectionUpdate = (querySnapshot: any) => {
    const collection: any = [];
    querySnapshot.forEach((doc: any) => {
      collection.push(doc.data());
    });
    this.setState({
      collection,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="collection">
        {this.state.collection.map((note: any, index: any) => (
          <div>
          <this.Notecomponent note={note} key={index} />
          <Divider />
          </div>
        ))}
      </div>
    );
  }
}

export default NoteCollection;
