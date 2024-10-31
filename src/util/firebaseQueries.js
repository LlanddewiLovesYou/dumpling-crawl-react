import {
  doc,
  setDoc,
  collection,
  where,
  getDoc,
  query,
  getDocs,
} from "firebase/firestore";

export const getRatingByKey = async (firestore, selectId) => {
  const ratingRef = doc(firestore, "ratings", selectId);
  const ratingSnapshot = await getDoc(ratingRef);

  return ratingSnapshot.data();
};

export const insertRating = async (e, firestore, selectId, record) => {
  const ratingRef = doc(firestore, "ratings", selectId);
  await setDoc(
    ratingRef,
    { ...record, score: e.target.value },
    { merge: true }
  );
};

export const getAllRestaurantRatings = async (firestore, restaurantName) => {
  const ratingsRef = collection(firestore, "ratings");
  const q = query(ratingsRef, where("destination", "==", restaurantName));
  const ratingSnapshot = await getDocs(q);

  const docs = ratingSnapshot.docs;

  return docs.map((doc) => doc.data());
};

export const getRatingsForRestaurantbyUser = async (
  firestore,
  destination,
  userId
) => {
  const ratingsRef = collection(firestore, "ratings");
  const q = query(
    ratingsRef,
    where("destination", "==", destination),
    where("userId", "==", userId)
  );

  const ratingSnapshot = await getDocs(q);

  const docs = ratingSnapshot.docs;

  return docs.map((doc) => doc.data());
};

export const sendReview = async (e, firestore, selectId, doc, fetchRatings) => {
  e.preventDefault();
  try {
    await insertRating(e, firestore, selectId, doc);
    await fetchRatings();
  } catch (e) {
    console.log(e);
    throw new Error("Document did not update!");
  }
};
