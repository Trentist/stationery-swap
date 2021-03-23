import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Alert} from "react-native";

export async function  signUp(email, pass, name) {
  let response;
  try {
    await auth().createUserWithEmailAndPassword( email, pass);
    const currentUser = auth().currentUser;
    response="added"
    console.log("currentUser:",currentUser)
    if(currentUser){
    const db = firestore();
    await db.collection("users").add({
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
      console.log("There is something wrong! Current User Data Is Not Saved");
    }
  
  } catch (err) {
    response=err
    console.log("There is something wrong!!!!", err.code);
  }
 return response
}

 export async function logIn(mail, pass) {
   let response;
   try {
    await auth().signInWithEmailAndPassword(mail, pass)
    response="added"
   } catch (err) {
     console.log("There is something wrong!", err.message);
     response=err
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

export async function  updateProfileInfo(profileImage,profileName,location,description) {
  let response;
  try {
    let refId;
    const currentUser = auth().currentUser;
    if(currentUser){
      let snapshot = await firestore()
      .collection('users')
      .where('uid', '==', currentUser.uid)
      .get();
      snapshot.forEach(doc =>refId= doc.id);
      console.log("user key",refId)
      await storage().ref(profileImage.fileName)
      .putFile(profileImage.uri)
      .then((snapshot) => {
      console.log(`${snapshot} has been successfully uploaded.`);
      })
      .catch((e) => console.log('uploading image error => ', e));

      const updateDetail = {
        ProfileImage:profileImage.fileName,
        ProfileName:profileName,
        location:location,
        description:description
      };

      await firestore()
      .collection('users')
      .doc(refId)
      .update(updateDetail)
      .then(() => {
        response="added"
        console.log('success',updateDetail);
      })
      .catch(error => {
        const {code, message} = error;
        console.log(message);
      });
    }else{
      console.log("Current User Token is Expired");
    }
  
  } catch (err) {
    response=error
    console.log("There is something wrong!!!!", err.message);
  }
  return response;
}

export async function  getUserInfo() {
  let user=[];
  try {
    const currentUser = auth().currentUser;
    if(currentUser){
      let snapshot = await firestore()
      .collection('users')
      .where('uid', '==', currentUser.uid)
      .get();
      
    snapshot.forEach((doc) => {
          user.push({
            email: doc.data().email,
            key: doc.id,
            ProfileName: doc.data().ProfileName,
            imageUrl : doc.data().ProfileImage,
            location : doc.data().location,
            description:doc.data().description
          });
        });

      const url=await storage().ref(user[0].imageUrl).getDownloadURL();
      user[0].imageUrl=url
       console.log("user is:",user)     
    }else{
      console.log("Current User Token is Expired");
    }
  } catch (err) {
    console.log("There is something wrong!!!!", err.message);
  }
  return user
}