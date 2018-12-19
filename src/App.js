import React, { Component } from 'react';
import khalti from "khalti-web"

let config = {
  // replace this key with yours
  "publicKey": "test_public_key_a98c3a80b7ba4c7095627a4e7a1c89dc",
  "productIdentity": "12345",
  "productName": "Drogon",
  "productUrl": "http://gameofthrones.com/buy/Dragons",
  "amount":2000,
  "eventHandler": {
      onSuccess (payload) {
          // hit merchant api for initiating verfication
          console.log(payload);
      },
      // onError handler is optional
      onError (error) {
          // handle errors
          console.log(error);
      },
      onClose () {
          console.log('widget is closing');
      }
  }
};

let checkout = new khalti(config);
let btn = document.getElementById("payment-button");

checkout.show()

class App extends Component {
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
