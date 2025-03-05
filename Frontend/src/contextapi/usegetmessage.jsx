import React, { useEffect } from 'react';
import useconversation from '../contextapi/useconversation.js';
import axios from 'axios';

function usegetmessage() {
    const { selectedconversation, setmessage, message } = useconversation();

    useEffect(() => {
        const getmessage = async () => {
            if (!selectedconversation) {
                console.log("No selected conversation");
                return; // Exit if no conversation is selected
            }

            try {
                const response = await axios.get(`http://localhost:3000api/message/showmessages/${selectedconversation._id}`);
                console.log("API Response:", response.data);
                console.log(`http://localhost:3000/api/message/showmessages/${selectedconversation._id}`)
                setmessage(response.data);
            } catch (error) {
                console.log("Error in getting messages", error);
            }
        };

        getmessage();
    }, [selectedconversation,setmessage]); // Dependency array includes selectedconversation

    return { message, selectedconversation };
}

export default usegetmessage;
