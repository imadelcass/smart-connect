import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {Context} from './context'
import { EmailContext } from './EmailContext'
import { auth, db, storage } from './firebase'
import './style/CompletProfile.css'
function CompletProfile() {
    const history = useHistory()
    const [names, setname] = useContext(Context);
    const [nameEmail, setNameEmail] = useContext(EmailContext);
    const [day , setday] = useState('');
    const [age, setage] = useState("");
    const blankImg = 'http://www.puckagency.com/wp-content/uploads/2017/09/blank-profile.jpg';
    const [profileImage, setprofileImage] = useState(blankImg);
    const [user , setUser] = useState([]);
    const [id , setId] = useState('this is id');

    const updateAge = e => {
        setage(e.target.value)
    }
    const updateDay = e => {
        setday(e.target.value)
    }
    const updatName = e => {
        e.preventDefault();
        // setname(preNames => [
        //     ...preNames,{
        //     age : age,
        //     day : day
        // }])
    }
    const extname = nameEmail.slice(0,nameEmail.indexOf("@"))

    const getUsers = () => {
        return new Promise((resolve, reject) => {
            if(true){
                resolve(
                    db.collection("users").onSnapshot(snapshot => {
                    // const items = [];
                    snapshot.forEach(doc => {
                        if(doc.data().email == nameEmail){
                            // items.push(doc.data())
                            setId(doc.id)
                            console.log('2 : ' + id);
                        }
                    });
                    // setUser(items);
                }))
            }else{
                reject("error here")
            }
        });
    }
    // useEffect(() => {
    //     getUsers();
    //     console.log(3);

    // },[profileImage]) 
    // uploadImage
    const uploadImage = e => {
        e.preventDefault();
        getUsers().then(updateImage(e))
    }
    const updateImage = e => {
        setprofileImage(e.target.files[0]);
        setTimeout(() => {
            console.log(e.target.files[0].name);
        }, 3000);
        const uploadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage.ref("images")
                .child(e.target.files[0].name)
                .getDownloadURL()
                .then(url => {
                    setprofileImage(url);
                    console.log(4);
                    console.log('4 : ' + id);
                    db.collection('users').doc(id).update({
                         age : age,
                         image : url 
                    })
                    // history.push('/profile')
                });
            }
        );
    };
    auth.onAuthStateChanged(user => {
        setNameEmail(user.email)
       });
    // fetch data from cloud firestore
   
        // db.collection('users').onSnapshot(snapshot => {
        //     setUser(snapshot.docs.map(doc => {
        //         doc.data()
        //     }))
        // })

    return (
        <div className='completProfile'>
            <h1>Hi {extname} , one more step to done</h1>
            <img src={profileImage} className="completProfile__profileImg" alt="profile"/>
            <form className="completProfil__form" onSubmit={updatName}>
                <label className="completProfile__age" htmlFor="age">Your age : </label>
                <input type="text" id="age" value={age} onChange={updateAge}/>
                <label className="completProfile__uploadImg"
                       htmlFor="uploadImg"
                       access="image/*">Choose your image :
                </label>
                <input 
                    className="completProfile__inputFile" 
                    type="file" 
                    id="uploadImg"
                    onChange={uploadImage}/>
                <button className="completProfile__button"
                        onClick={getUsers}>submit
                </button>
            </form>
        </div>
    )
}
export default CompletProfile
