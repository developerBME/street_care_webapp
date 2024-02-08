import React from "react";

import Landing from "./HomePage/Landing";
import Success from "./HomePage/Success";

function Temp_EM() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-xs max-h-full text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Check your email</h3>
                <p className="text-gray-600">
                    Follow the instructions sent to your email address to reset your password.
                </p>
                <button
                    className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"

                >
                    Back to login
                </button>
            </div>
        </div>
    );
};

export default Temp_EM;