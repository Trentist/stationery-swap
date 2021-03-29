import firestore from '@react-native-firebase/firestore';

export async function addTags(productTags) {
  for (const tag of productTags) {
    let refId;
    let counter;
    let snapshot = null
    snapshot = await firestore()
    .collection('tagsList')
    .where('tag', '==',tag)
    .get().catch(() => { 
      throw ('Error in finding tags.')
    });
     if( snapshot !=null ){
      console.log("item inside the if statement:",tag)
      snapshot.forEach((doc) =>{
        refId = doc.id,
        counter= doc.data().counter
      });
      const updateDetail = {
        counter:counter+1
      };

      await firestore()
      .collection('tagsList')
      .doc(refId)
      .update(updateDetail)
      .catch(() => { 
        throw ('error in updating.')
     });

     }else{
      await firestore().collection("tagsList").add({
        tag: tag,
        counter: 1
      }).catch(() => { 
        throw ('error in adding tag.')
     });
     } 
  }
}

export async function getTags(limit) {
    let tags = [];
    let snapshot = await firestore()
      .collection('tagsList')
      .orderBy('counter', 'desc')
      .limit(limit)
      .get().catch(() => { 
        throw ('No record found.')
     });
    
    snapshot.forEach((doc)=> { 
      tags.push({
        key: doc.id,
        tag: doc.data().tag,
        counter: doc.data().counter
      });
    }); 
    return tags
}