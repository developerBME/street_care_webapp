import React, { useState } from 'react';
import { getAuth, deleteUser, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const DeleteUserPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleDeleteUser = async () => {
        try {
            // Validate email format
            if (!validateEmail(email)) {
                setError('Invalid email format. Please enter a valid email.');
                return;
            }

            // Sign in with email and password
            await signInWithEmailAndPassword(auth, email, password);

            // Delete user
            await deleteUser(auth.currentUser);
            setError('User account deleted successfully.');

            // Sign out
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user data', error);
            setError('Error deleting user data. Please try again.');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
            <div className="relative flex flex-col items-center ">
                <div className=" w-fit mx-2 lg:mx-40 mt-40 mb-16 rounded-2xl bg-white text-black ">
                    <div className="items-center justify-center px-4 py-8 lg:px-36 lg:py-24 h-full w-full mx-auto rounded-2xl ">
                        <h2 className="card-title">Delete User</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>
                                Delete User
                            </button>
                        </form>
                        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserPage;
