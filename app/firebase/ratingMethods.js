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

export async function  followItem(id,followedArray,rating) {
      const currentUser = auth().currentUser;
      followedArray.push(currentUser.uid)
      const updateDetail = {
        followedArray: Object.assign({ ...followedArray }),
        rating:rating
      };

      await firestore()
      .collection('products')
      .doc(id)
      .update(updateDetail)
      .catch(() => { 
        throw ('item not followed')
       });
}

export async function  unfollowItem(id,followedArray,rating) {
      const currentUser = auth().currentUser;
      followedArray = followedArray.filter((uid) => {
        return uid != currentUser.uid
      })
      
      const updateDetail = {
        followedArray: Object.assign({ ...followedArray }),
        rating:rating
      };

      await firestore()
      .collection('products')
      .doc(id)
      .update(updateDetail)
      .catch(() => { 
        throw ('item not followed')
       });
}