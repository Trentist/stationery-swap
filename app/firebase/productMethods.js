import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export async function addProduct(imageArray, title, price, location, description, productTags) {
  let nameArray = [];
  const currentUser = auth().currentUser;
  for (const file of imageArray) {
    const imageRef = storage().ref(`product/${file.fileName}`)
      await imageRef.putFile(file.uri).catch(() => {
         throw ('image Uploading failed') 
        })
      
      const url = await imageRef.getDownloadURL().catch(() => { 
        throw ('images are not correctly uploaded')
       });
    nameArray.push(url)
  }
  console.log("nameArray:", nameArray)
  const db = firestore();
  await db.collection("products").add({
    uid: currentUser.uid,
    imageArray: Object.assign({ ...nameArray }),
    title: title,
    price: price,
    location: location,
    description: description,
    productTags: productTags,
    viewCount: 0,
    followedArray: {},
    rating: 0
  }).catch(() => { 
    throw ('Product not Added.')
 });
}

export async function getFeaturedProducts(limit) {
  let product = [];
  const currentUser = auth().currentUser;
  let snapshot = await firestore()
    .collection('products')
    .orderBy('rating', 'desc')
    .limit(limit)
    .get().catch(() => { 
      throw ('No record found.')
   });
  
  snapshot.forEach((doc)=> { 
    let followedArray = Object.values(doc.data().followedArray)
    let isFollowed = followedArray.some((uid)=> {
      return uid == currentUser.uid
    })
    product.push({
      key: doc.id,
      uid: doc.data().uid,
      imageArray: Object.values(doc.data().imageArray),
      title: doc.data().title,
      price: doc.data().price,
      location: doc.data().location,
      description: doc.data().description,
      productTags: doc.data().productTags,
      viewCount: doc.data().viewCount,
      followedArray: followedArray,
      rating: doc.data().rating,
      isFollowed:isFollowed
    });
  });
  return product
}

export async function getTagsProducts(limit,tags) {
  let product = [];
  const currentUser = auth().currentUser;
  for (const tag of tags) {
    console.log("tag inside function:",tag.tag);
    let snapshot = await firestore().collection('products')
    .where("productTags", "array-contains", tag.tag)
    .limit(limit)
    .get().catch((error) => { 
      throw error
   });

  snapshot.forEach((doc)=> { 
    let followedArray = Object.values(doc.data().followedArray)
    let isFollowed = followedArray.some((uid)=> {
      return uid == currentUser.uid
    })
    product.push({
      key: doc.id,
      uid: doc.data().uid,
      imageArray: Object.values(doc.data().imageArray),
      title: doc.data().title,
      price: doc.data().price,
      location: doc.data().location,
      description: doc.data().description,
      productTags: doc.data().productTags,
      topTag: tag.tag,
      viewCount: doc.data().viewCount,
      followedArray: followedArray,
      rating: doc.data().rating,
      isFollowed:isFollowed
    });
  }); 
  
  }
  return product
}

export async function getFollowedProducts(limit) {
  let product = [];
  const currentUser = auth().currentUser;    
  let snapshot = await firestore().collection('products')
  .where("followedArray", "array-contains", currentUser.uid)
  .limit(limit)
  .get().catch((error) => { 
      throw error
   });

  snapshot.forEach((doc)=> {
    product.push({
      key: doc.id,
      uid: doc.data().uid,
      imageArray: Object.values(doc.data().imageArray),
      title: doc.data().title,
      price: doc.data().price,
      location: doc.data().location,
      description: doc.data().description,
      productTags: doc.data().productTags,
      viewCount: doc.data().viewCount,
      followedArray: Object.values(doc.data().followedArray),
      rating: doc.data().rating,
      isFollowed:true
    });
  }); 
  return product
}