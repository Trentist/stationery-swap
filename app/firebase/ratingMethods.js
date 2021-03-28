import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function  viewedItem(id,viewCount,rating) {
  let response;
  try {
    const currentUser = auth().currentUser;
    if(currentUser){
    const updateDetail = {
      viewCount:viewCount,
      rating:rating
    };

    await firestore()
    .collection('products')
    .doc(id)
    .update(updateDetail)
    .then(() => {
      response="added"
      console.log('successs',updateDetail);
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

export async function  followItem(id,followCount,rating) {
    let response;
    try {
      const currentUser = auth().currentUser;
      if(currentUser){
    const db = firestore();
    await db.collection("ItemFollows").add({
      uid: currentUser.uid,
      itemId:id,
    })
    .then(async(docRef) => {
      response="added"
      console.log("Document written with ID: ", docRef.id);
      const updateDetail = {
        followCount:followCount,
        rating:rating
      };

      await firestore()
      .collection('products')
      .doc(id)
      .update(updateDetail)
      .then(() => {
        console.log('successs',updateDetail);
      })
      .catch(error => {
        const {code, message} = error;
        console.log(message);
      });
      })
      .catch((error) => {
      console.error("Error adding document: ", error);
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

export async function  unfollowItem(id,followCount,rating) {
  let response;
  try {
    const currentUser = auth().currentUser;
    if(currentUser){

  await firestore().collection('ItemFollows')
  .doc(id)
  .delete()
  .then(async() => {
    response="deleted"
    console.log("Document deleted: ");
    const updateDetail = {
      followCount:followCount,
      rating:rating
    };

    await firestore()
    .collection('products')
    .doc(id)
    .update(updateDetail)
    .then(() => {
      console.log('successs',updateDetail);
    })
    .catch(error => {
      const {code, message} = error;
      console.log(message);
    });
    })
    .catch((error) => {
    console.error("Error adding document: ", error);
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
  
  export async function  getfolloweditems() {
    let followed=[];
    try {
      const currentUser = auth().currentUser;
      if(currentUser){
        let snapshot = await firestore()
        .collection('ItemFollows')
        .where('uid', '==', currentUser.uid)
        .get();
        
      snapshot.forEach((doc) => {
            followed.push({
              key: doc.id,
              itemId:doc.data().itemId
            });
          });     
      }else{
        console.log("Current User Token is Expired");
      }
    } catch (err) {
      console.log("There is something wrong!!!!", err.message);
    }
    return followed
  }