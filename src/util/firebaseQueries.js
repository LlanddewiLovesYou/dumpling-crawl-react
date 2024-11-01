import {
  doc,
  setDoc,
  collection,
  where,
  getDoc,
  query,
  getDocs,
} from "firebase/firestore";

import { debounce } from "lodash";

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

export const insertNote = async (e, firestore, selectId, record, notes) => {
  const noteRef = doc(firestore, "notes", selectId);
  console.log({ noteRef, record, notes });
  await setDoc(noteRef, { ...record, note: notes }, { merge: true });
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

export const getNotesForRestaurantbyUser = async (
  firestore,
  destination,
  userId
) => {
  const ratingsRef = collection(firestore, "notes");
  const q = query(
    ratingsRef,
    where("destination", "==", destination),
    where("userId", "==", userId)
  );

  const noteSnapshot = await getDocs(q);

  const docs = noteSnapshot.docs;

  return docs.map((doc) => doc.data())[0];
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

export const sendNotes = async (
  e,
  firestore,
  selectId,
  record,
  refetchNotes,
  notes
) => {
  e.preventDefault();
  try {
    await insertNote(e, firestore, selectId, record, notes);
    await refetchNotes();
  } catch (e) {
    console.log(e);
    throw new Error("Document did not update!");
  }
};
