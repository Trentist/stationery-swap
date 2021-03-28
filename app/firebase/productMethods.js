import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export async function  addProduct(imageArray,title,price,category,location,description,productTags) {
    let response;
    try {
      let nameArray=[];
      const currentUser = auth().currentUser;
      if(currentUser){
        imageArray.forEach(async(file)=>{
          nameArray.push(file.fileName)
          await storage().ref(`product/${file.fileName}`)
          .putFile(file.uri)
          .then((snapshot) => {
          console.log(`${snapshot} has been successfully uploaded.`);
          })
          .catch((e) => console.log('uploading image error => ', e));
        })
        
    console.log("nameArray:",nameArray)
    const db = firestore();
    await db.collection("products").add({
      uid: currentUser.uid,
      imageArray:Object.assign({...nameArray}),
      title:title,
      price:price,
      category:category,
      location:location,
      description:description,
      productTags:productTags,
      viewCount:0,
      followCount:0,
      rating:0
    })
    .then((docRef) => {
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
  
  export async function  getProducts() {
    let product=[];
    try {
      const currentUser = auth().currentUser;
      if(currentUser){
        let snapshot = await firestore()
        .collection('products')
        .orderBy('rating','desc') 
        .get();
        
        
      snapshot.forEach((doc) => {
            product.push({
              key: doc.id,
              uid: doc.data().uid,
              imageArray:Object.values(doc.data().imageArray),
              title:doc.data().title,
              price:doc.data().price,
              category:doc.data().category,
              location:doc.data().location,
              description:doc.data().description,
              productTags:doc.data().productTags,
              viewCount:doc.data().viewCount,
              followCount:doc.data().followCount,
              rating:doc.data().rating
            });
          });
         
      let index=0
      for (const item of product) {
      let imageIndex=0
      for (const image of item.imageArray) {
        const url=await storage().ref(`product/${image}`).getDownloadURL()
        product[index].imageArray[imageIndex] = url
        console.log("product outside is",product[index].imageArray[imageIndex])
        imageIndex++;
      }
      index++;
    }

        console.log("product is:",product) 
      }else{
        console.log("Current Usser Token is Expired");
      }
    } catch (err) {
      console.log("There is something wrong!!!!", err.message);
    }
    
    return product
  }