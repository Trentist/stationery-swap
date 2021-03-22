import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from "react-native";

export async function  signUp(email, pass, name) {
  try {
    await auth().createUserWithEmailAndPassword( email, pass);
    const currentUser = auth().currentUser;
    console.log("currentUser:",currentUser)
    if(currentUser){
    const db = firestore();
    db.collection("users").add({
      uid: currentUser.uid,
      email: currentUser.email,
      name: name,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    }else{
      Alert.alert("There is something wrong! Current User Data Is Not Saved");
    }
  
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

 export async function logIn(mail, pass) {
   let response;
   try {
    response = await auth().signInWithEmailAndPassword(mail, pass)
   } catch (err) {
     Alert.alert("There is something wrong!", err.message);
     response="error"
   }
   return response;
 }

export async function loggingOut() {
  try {
    await auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function passwordReset(mail) {
  try {
    await auth().sendPasswordResetEmail(mail)
    console.log('Password reset email sent successfully')
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function  getUserInfo() {
  try {
  let user=[]
    const currentUser = auth().currentUser;
    if(currentUser){
      let snapshot = await firestore()
      .collection('users')
      .where('uid', '==', currentUser.uid)
      .get();
      
      snapshot.forEach(doc => {
          user.push({
            email: doc.data().email,
            key: doc.id,
            name: doc.data().name,
          });
        });
      console.log("user:",user)
      return user;     
    }else{
      Alert.alert("Current User Token is Expired");
    }
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}