//(function() {

  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAPB79ttcIJeROrP6ce5T4vR3Yuoe77ttk",
    authDomain: "web-firestore-quickstart.firebaseapp.com",
    databaseURL: "https://web-firestore-quickstart.firebaseio.com",
    projectId: "web-firestore-quickstart",
    storageBucket: "web-firestore-quickstart.appspot.com",
    messagingSenderId: "272149722147",
    appId: "1:272149722147:web:4a3ad79495e215acb0ad96"
  };
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();

  const docRef = firestore.doc("samples/sandwichData");
  const outputHeader = document.querySelector("#hotDogOutput");
  const inputTextField = document.querySelector("#latestHotDogStatus ");
  const saveButton = document.querySelector("#saveButton");
  const loadButton = document.querySelector("#loadButton");

  saveButton.addEventListener("click", function() {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRef.set({
      hotDogStatus: textToSave
    }).then(function() {
      console.log("Status saved!");
    }).catch(function (error) {
      console.log("Got an error: ", error);
    });
  })

  loadButton.addEventListener("click", function() {
    docRef.get().then(function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data();
        outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
      }
    }).catch(function (error) {
      console.log("Got an error: ", error);
    });
  });

  getRealtimeUpdates = function() {
    docRef.onSnapshot(function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data();
        console.log("Check out this document I recived ", doc);
        outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
      }
    });
  }

  getRealtimeUpdates();

//})();
