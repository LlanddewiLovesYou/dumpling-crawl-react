import "./App.css";
import { createContext } from "react";
import { NavBar } from "./components/NavBar/NavBar";

import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { Router } from "./components/Router";

const fbApp = firebase.initializeApp({
  apiKey: "AIzaSyA5JjQ3CiTcr1kzZN51xBYrbMbIqX616Pk",
  authDomain: "dumpling-crawler.firebaseapp.com",
  projectId: "dumpling-crawler",
  storageBucket: "dumpling-crawler.appspot.com",
  messagingSenderId: "59289479742",
  appId: "1:59289479742:web:2625a33386bc83648abf6f",
});

const auth = getAuth(fbApp);
const firestore = getFirestore(fbApp);

export const FirebaseContext = createContext({});

export const RestRubricContext = createContext({});

const constants = {
  restaurants: [
    {
      name: "1. Wu's Wonton King",
      mapUrl: "https://maps.app.goo.gl/M4nEwmBRqtRQAivH6",
    },
    {
      name: "2. North Dumpling",
      mapUrl: "https://maps.app.goo.gl/pr1PFxm28RHk2WyY9",
    },
    {
      name: "3. King Dumplings",
      mapUrl: "https://maps.app.goo.gl/sVxJPEYaCX3Rbdjh7",
    },
    {
      name: "4. Shu Jiao Fu Zhou",
      mapUrl: "https://maps.app.goo.gl/n7BQTG6CDxs9C6YQ7",
    },
    {
      name: "5. Fu Zhou Wei Zhong Wei Jia Xiang Feng Wei",
      mapUrl: "https://maps.app.goo.gl/1qQjSrXQVuvHJdQJ8",
    },
    {
      name: "6. Sanmiwago",
      mapUrl: "https://maps.app.goo.gl/81daVUtY3wKjXEF98",
    },
    {
      name: "7. 456 New Shanghai",
      mapUrl: "https://maps.app.goo.gl/8qsYTtNNyJsyXCoC6",
    },
    {
      name: "8. Fried Dumpling",
      mapUrl: "https://maps.app.goo.gl/upeQj3nvszST8NJB8",
    },
    {
      name: "9. Wo Hop",
      mapUrl: "https://maps.app.goo.gl/oSNd3YDgUoz52ine9",
    },
    {
      name: "10. Jin Mei Dumpling",
      mapUrl: "https://maps.app.goo.gl/24pwoK2rXC7tjwpT7",
    },
  ],

  rubric: ["Wrapper", "Filling", "Sauce", "Value", "Bonus"],
};

function App() {
  return (
    <>
      <FirebaseContext.Provider value={{ auth, firestore }}>
        <NavBar />
        <RestRubricContext.Provider
          value={{
            restaurants: constants.restaurants,
            rubric: constants.rubric,
          }}
        >
          <Router />
        </RestRubricContext.Provider>
      </FirebaseContext.Provider>
    </>
  );
}

export default App;
