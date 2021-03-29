import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function  viewedItem(id,viewCount,rating) {
    const updateDetail = {
      viewCount:viewCount,
      rating:rating
    };

    await firestore()
    .collection('products')
    .doc(id)
    .update(updateDetail)
    .catch(error => {
      const {code, message} = error;
      console.log(message);
    });
}

export async function  followItem(id,followCount,rating) {
      const currentUser = auth().currentUser;
    const db = firestore();
    await db.collection("ItemFollows").add({
      uid: currentUser.uid,
      itemId:id,
    })
    .then(async() => {
      const updateDetail = {
        followCount:followCount,
        rating:rating
      };

      await firestore()
      .collection('products')
      .doc(id)
      .update(updateDetail)
      .catch(() => { 
        throw ('item not followed')
       });
      })
      .catch(() => { 
        throw ('item not followed')
       });
}

export async function  unfollowItem(id,followCount,rating) {
  await firestore().collection('ItemFollows')
  .doc(id)
  .delete()
  .then(async() => {

    const updateDetail = {
      followCount:followCount,
      rating:rating
    };

    await firestore()
    .collection('products')
    .doc(id)
    .update(updateDetail)
    .catch(() => { 
      throw ('item not unfollowed')
     });
    })
    .catch(() => { 
      throw ('item not unfollowed')
     });
}
  
  export async function  getfolloweditems() {
    let followed=[];
      const currentUser = auth().currentUser;
        let snapshot = await firestore()
        .collection('ItemFollows')
        .where('uid', '==', currentUser.uid)
        .get().catch(() => { 
          throw ('Unknown error occurred')
         });
        
      snapshot.forEach((doc) => {
            followed.push({
              key: doc.id,
              itemId:doc.data().itemId
            });
          });
    return followed
  }