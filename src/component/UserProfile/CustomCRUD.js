
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import CustomButton from "../Buttons/CustomButton";

const TEST_COLLECTION = process.env.REACT_APP_FIREBASE_TESt_COLLECTION_SINDHUJA

function CustomCRUD() {

    const [testUserList, setUserList] = useState([]);
    const testUsercollectionRef = collection(db, TEST_COLLECTION)

    // New user states
    const [newUserName, setNewUserName] = useState("")
    const [newUserAge, setNewUserAge] = useState(0)

    //update name state
    const [updatedName, setUpdatedName] = useState()

    //READ USER
    const getTestUserList = async() => {
        console.log('test')
        try {
        const data = await getDocs(testUsercollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(), id: doc.id, //returns doc id and doc data
        }))
        setUserList(filteredData);
        console.log('test2')
        console.log(data);
        console.log(filteredData);
        } catch (err) {
        console.error(err);
        }
    };

    //DELETE USER
    const deleteUser = async (id) => {
        try {
            const userDoc = doc(db,TEST_COLLECTION,id)
            await deleteDoc(userDoc);
            getTestUserList();
        } catch(err) {
            console.log(err);
        }
    }

    //UPDATE USER
    const updateUser = async (id,) => {
        try {
            const userDoc = doc(db,TEST_COLLECTION,id)
            await updateDoc(userDoc, {name : updatedName});
            getTestUserList();
        } catch(err) {
            console.log(err);
        }
    }

    //ADD USER
    const onSubmitUser = async () => {
        try {
            await addDoc(testUsercollectionRef, 
                {
                    name: newUserName,
                    age: newUserAge
                }
            );
            getTestUserList();
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        //READ
        getTestUserList();
    }, []);

    return (
        <div className="CustomCRUD">
            <div>
                <input placeholder="name.." onChange = {(e) => setNewUserName(e.target.value)}/>
                <input placeholder="age.." type ="number" onChange = {(e) => setNewUserAge(Number(e.target.value))}/>
                <CustomButton
                    name="buttondefault"
                    class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2  rounded transition duration-150"
                    label="Submit"
                    onClick={(onSubmitUser)}
                ></CustomButton>
            </div>
            <br></br>
            <div>
                {testUserList.map((user) => (
                    <div>
                        <p style = {{color: 'green'}}> {user.name} {user.age} </p>
                        <input placeholder="update name..." onChange={(e) => setUpdatedName(e.target.value)}/>
                        <CustomButton
                            name="buttondefault"
                            class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2  rounded transition duration-150"
                            label="Update"
                            onClick={()=>(updateUser(user.id))}
                        ></CustomButton>
                        <CustomButton
                            name="buttondefault"
                            class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2  rounded transition duration-150"
                            label="Delete"
                            onClick={()=>(deleteUser(user.id))}
                        ></CustomButton>
                        <br></br>
                    </div>
                ))}
            </div>
            {/* Sindhuja */}             {/* customCRUD calling point(Profile.js) */}
            {/*   <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mt-24  lg:mx-40 lg:mt-32 rounded-2xl bg-white text-black ">
                    <div className="flex flex-col gap-4 lg:gap-14 lg:p-24 pl-8 pt-4 pb-4 pr-8">
                        <div className="inline-flex flex-col sm:flex-row sm:space-x-16 ">
                        <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage leading-[52px]">
                            <CustomCRUD></CustomCRUD>
                        </div>
                        </div>
                    </div>
                </div> 
            */}
        </div>
        
    )
}


export default CustomCRUD;

