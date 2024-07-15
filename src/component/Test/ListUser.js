
import { collection, deleteDoc, doc, getDocs,onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import EditUser from "./EditUser";

const TESTUSER_COLLECTION = process.env.REACT_APP_FIREBASE_TESTUSER_COLLECTION;

function ListUser() {

    const [userList, setUserList] = useState([]);
    const [userId, seteditUserId] = useState([]);
    const usercollectionRef = collection(db, TESTUSER_COLLECTION)


    const getUserList = async() => {
        try {
            const data = await getDocs(usercollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(), id: doc.id,
            }))
            setUserList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    // function getUserData(){
    //     usercollectionRef.onSnapshot((querySnapshot) => {
    //         const userdata=[]
    //         querySnapshot.forEach((doc) => {
    //             userdata.push(doc.data())
    //         });
    //         setUserList(userdata);
    //     })
    // }

    const deleteUser = async (id) => {
        try {
            const userDoc = doc(db,TESTUSER_COLLECTION,id)
            await deleteDoc(userDoc);
            alert("User deleted successfully");
            getUserList();
        } catch(err) {
            console.log(err);
        }
    }

    const setEditUser  = async (id) => {
        seteditUserId(id)
    }


    useEffect(()=> {
        getUserList();
    }, []);

    return (
        <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
        <div className="relative flex flex-col items-center ">
          <div className="sm:w-[768px] m-3 lg:mx-40 mt-32 mb-8 rounded-2xl bg-white text-black ">
            {" "}
            <div className="p-4 md:py-[100px] md:px-[128px] ">
              <div>
                <div>
                {userList.map((user) => (
                    <div>
                        {console.log(user.name)}
                            <p> Name : {user.name}  </p>
                            <p> Email : {user.email} </p>
                            <p>Contact: {user.contact}</p><br/>
                            <button
                                className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]"
                                onClick={()=>(deleteUser(user.id))}>
                               Delete User
                            </button>
                            <button className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]"
                                onClick={()=>(setEditUser(user.id))}>
                               Update User
                            </button>
                            {
                                userId == user.id && <EditUser user={user} seteditUserId ={seteditUserId} getUserList={getUserList} />
                            }
                            
                            <br/><br/>
                    </div>
                ))}
            </div>
        </div>
        </div></div></div></div>
    )
}


export default ListUser;

