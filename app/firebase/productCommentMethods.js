import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export async function  sendProductComment(id,productComment) {
    let response;
    try {
      const currentUser = auth().currentUser;
      if(currentUser){
      const url=await storage().ref().getDownloadURL();    
      const db = firestore();
      await db.collection("ItemComments").add({
        uid: currentUser.uid, 
        itemId:id, 
        ProfileImage: currentUser.imageUrl,  
        ProfileName: currentUser.ProfileName,  
        productComment: productComment
      })
    .then(async(docRef) => {
      response="added"
      console.log("Document written with ID: ", docRef.id);
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
  
export async function  getProductComment(id) {
    let productComments=[];
    try {
      const currentUser = auth().currentUser;
      if(currentUser){
        console.log("curren user:",currentUser)
        let snapshot = await firestore()
        .collection('ItemComments')
        .where('itemId', '==',id)
        .get();
        
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
      
          for (const item of productComments) {
            const url = await storage().ref(item.ProfileImage).getDownloadURL()
            item.ProfileImage = url
            console.log("comment profile url:",item.ProfileImage)
          }          
      }else{
        console.log("Current User Token is Expired");
      }
    } catch (err) {
      console.log("There is something wrong!!!!", err.message);
    }
    return productComments;
}