import { useEffect, useState } from "react";

import API from "../services/api";


function Messages() {

  const [messages, setMessages] =
    useState([]);


  useEffect(() => {

    fetchMessages();

  }, []);


  const fetchMessages = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(

        "/messages",

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      setMessages(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">

        Messages

      </h1>


      {

        messages.length === 0

        ? (

          <p>No messages yet.</p>

        )

        : (

          messages.map((msg) => (

            <div

              key={msg._id}

              className="
                border
                p-4
                rounded-lg
                mb-4
                shadow
              "
            >

              <h2 className="font-bold">

                Vehicle:
                {" "}
                {msg.vehicle?.title}

              </h2>

              <p>

                <strong>From:</strong>
                {" "}
                {msg.sender?.name}

              </p>

              <p>

                <strong>To:</strong>
                {" "}
                {msg.receiver?.name}

              </p>

              <p className="mt-2">

                {msg.text}

              </p>

            </div>

          ))

        )

      }

    </div>

  );

}

export default Messages;