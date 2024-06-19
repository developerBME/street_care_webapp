import React,{useState, useEffect} from "react";
import { updateDoc,doc } from "firebase/firestore";
import { db } from "../firebase";


function EditUser({user, seteditUserId}){

    const[updatedName, setname] = useState("")
    const[updatedEmail, setemail] = useState("")
    const[updatedContact, setcontact] = useState("")

    const updateUser = async () =>{
        try{
            const userDoc = doc(db,"TestUser",user.id)
            await updateDoc(userDoc, {name : updatedName, email: updatedEmail, contact: updatedContact});
            seteditUserId("")
            alert("User updated successfully")
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        setname(user.name);
        setemail(user.email);
        setcontact(user.contact);
    }, []);

    return (
        <div>
            <br/>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                    Name*
                    </p>
                    <input
                      type="text"
                      className={`w-full h-12 px-4 py-1 rounded border border-stone-300`}
                      placeholder="Enter your name"
                      onChange={ (e) => setname(e.target.value)}
                      value={updatedName}
                    />
                  </div>
                </div><br/>
                <div className="space-y-1.5">
                  <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                    Email Address*
                  </p>
                  <input
                    type="email"
                    className={`w-full h-12 px-4 py-1 rounded border border-stone-300`}
                    placeholder="name@email.com"
                    value={updatedEmail}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div><br/>
                <div className="space-y-1.5">
                  <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                    Contact*
                  </p>
                  <input
                      type="text"
                      className={`w-full h-12 px-4 py-1 rounded border border-stone-300`}
                      placeholder="Enter your contact"
                      value={updatedContact}
                      onChange={(e) => setcontact(e.target.value)}
                    />
                </div>
                <br/>
                <button
                  type="submit"
                  className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]"
                  onClick={()=> updateUser() }
                >
                  Update
                </button>
        </div>
    )
}

export default EditUser