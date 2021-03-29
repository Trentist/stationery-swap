import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function  sendComment(senderImage,senderName,receiverId,receiverImage,receiverName,comment) {
    let response;
      const currentUser = auth().currentUser;
      const db = firestore();
      await db.collection("UserChat").add({
        senderId: currentUser.uid, 
        senderImage: senderImage,  
        senderName: senderName,
        receiverId:receiverId, 
        receiverImage: receiverImage,  
        receiverName: receiverName,
        comment: comment,
        date:new Date()
      })
      .catch(() => { 
        throw ('Message has not been send.')
     });
    return response;
}
  
export async function  getComment() {
    let comments=[];
      const currentUser = auth().currentUser;
        let snapshot = await firestore()
        .collection('UserChat')
        .where('senderId', '==',currentUser.id)
        .get().catch(() => { 
          throw ('Unknown error occurred.')
       });
        
      snapshot.forEach((doc) => {
            comments.push({  
              key : doc.id,
              senderId: doc.data().senderId, 
              senderImage: doc.data().senderImage,  
              senderName: doc.data().senderName,
              receiverId: doc.data().receiverId, 
              receiverImage: doc.data().receiverImage,  
              receiverName: doc.data().receiverName,
              comment : doc.data().comment,
              date:doc.data().date
            });
          });
    return productComments;
}