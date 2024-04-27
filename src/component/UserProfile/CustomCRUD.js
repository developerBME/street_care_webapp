
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import CustomButton from "../Buttons/CustomButton";

function CustomCRUD() {

    const [testUserList, setUserList] = useState([]);
    const testUsercollectionRef = collection(db, 'test_collection_sindhuja')

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
            const userDoc = doc(db,"test_collection_sindhuja",id)
            await deleteDoc(userDoc);
            getTestUserList();
        } catch(err) {
            console.log(err);
        }
    }

    //UPDATE USER
    const updateUser = async (id,) => {
        try {
            const userDoc = doc(db,"test_collection_sindhuja",id)
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
        </div>
    )
}


export default CustomCRUD;
