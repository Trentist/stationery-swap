import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export async function  signUp(email, pass, name) {
    await auth().createUserWithEmailAndPassword( email, pass).catch((error) => {
      throw error 
     });
    const currentUser = auth().currentUser;
    const db = firestore();
    await db.collection("users").add({
      uid: currentUser.uid,
      email: currentUser.email,
      name: name,
      follower:[""],
      following:[""]
    }).catch((error) => {
        throw error
    })
}

 export async function logIn(mail, pass) {
    await auth().signInWithEmailAndPassword(mail, pass).catch(() => {
      throw ('email or password is incorrect!') 
     });
 }

export async function loggingOut() {
    await auth().signOut().catch(() => {
      throw ('Unknown error occurred') 
     });
}

export async function passwordReset(mail) {
    await auth().sendPasswordResetEmail(mail).catch(() => {
      throw ('some internal error occured') 
     });
}

export async function  updateProfileInfo(profileImage,profileName,location,description) {
      let refId;
      const currentUser = auth().currentUser;
      let snapshot = await firestore()
      .collection('users')
      .where('uid', '==', currentUser.uid)
      .get().catch(() => {
        throw ('user token is expired') 
       });
      snapshot.forEach(doc =>refId = doc.id);
      const imageRef = storage().ref(`user/${profileImage.fileName}`)
      await imageRef.putFile(profileImage.uri).catch(() => {
         throw ('image Uploading failed') 
        })
      
      const url = await imageRef.getDownloadURL().catch(() => { 
        throw ('image Not Correctly Uploaded')
       });

      const updateDetail = {
        ProfileImage:url,
        ProfileName:profileName,
        location:location,
        description:description
      };

      await firestore()
      .collection('users')
      .doc(refId)
      .update(updateDetail)
      .catch(() => { 
        throw ('Unknown error occurred.')
     });
}

export async function  getUserInfo() {
    let user=[];
    const currentUser = auth().currentUser;
      let snapshot = await firestore()
      .collection('users')
      .where('uid', '==', currentUser.uid)
      .get().catch(() => {
        throw ('user token is expired') 
       });
      
    snapshot.forEach((doc) => {
          user.push({
            email: doc.data().email,
            key: doc.id,
            uid:doc.data().uid,
            ProfileName: doc.data().ProfileName,
            imageUrl : doc.data().ProfileImage,
            location : doc.data().location,
            follower:doc.data().follower,
            following:doc.data().following,
            description:doc.data().description
          });
        });
    return user
}

export async function  getSellerInfo(uid) {
      let user=[];
      const currentUser = auth().currentUser;
      let snapshot = await firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get().catch(() => {
        throw ('no seller data found') 
       });
      
      snapshot.forEach((doc) => {
        let following = doc.data().follower
        console.log("following:",following)
        let isFollowed = following.some((uid)=> {
          return uid == currentUser.uid
        })
          user.push({
            key: doc.id,
            email: doc.data().email,
            uid:doc.data().uid,
            ProfileName: doc.data().ProfileName,
            imageUrl : doc.data().ProfileImage,
            location : doc.data().location,
            follower:doc.data().follower,
            following:doc.data().following,
            isFollowed:isFollowed,
            description:doc.data().description
          });
        });
  return user
}