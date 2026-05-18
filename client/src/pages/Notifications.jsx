import { useEffect, useState } from "react";

import API from "../services/api";


function Notifications() {

  const [notifications, setNotifications] =
    useState([]);


  useEffect(() => {

    fetchNotifications();

  }, []);


  const fetchNotifications = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(

        "/auth/notifications",

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      setNotifications(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">

        Notifications

      </h1>


      {

        notifications.length === 0

        ? (

          <p>No notifications yet.</p>

        )

        : (

          notifications.map((note) => (

            <div

              key={note._id}

              className="

                border

                p-4

                rounded-lg

                mb-4

                shadow

              "

            >

              <p>

                {note.message}

              </p>

              <small className="text-gray-500">

                {

                  new Date(
                    note.createdAt
                  ).toLocaleString()

                }

              </small>

            </div>

          ))

        )

      }

    </div>

  );

}

export default Notifications;