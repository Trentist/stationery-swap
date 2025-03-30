import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function  sendProductComment(id,imageUrl,ProfileName,productComment) {
    let response;
      const currentUser = auth().currentUser;
      const db = firestore();
      await db.collection("ItemComments").add({
        uid: currentUser.uid,
        itemId:id, 
        ProfileImage: imageUrl,  
        ProfileName: ProfileName,
        productComment: productComment,
        date:new Date()
      })
      .catch(() => { 
        throw ('Message has not been send.')
     });
    return response;
}
  
export async function  getProductComment(id) {
        let productComments=[];
        const currentUser = auth().currentUser;
        console.log("curren user:",currentUser.providerData)
        let snapshot = await firestore()
        .collection('ItemComments')
        .where('itemId', '==',id)
        .get().catch(() => { 
          throw ('Unknown error occurred.')
       });
        
        snapshot.forEach((doc) => {
            productComments.push({  
              key : doc.id,
              itemId : doc.data().itemId,
              uid : doc.data().uid,
              ProfileImage : doc.data().ProfileImage,
              ProfileName : doc.data().ProfileName, 
              productComment : doc.data().productComment,
            });
          });
    return productComments;
}