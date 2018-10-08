import React, { Component } from "react";
import firebase from "firebase";
import { View } from "react-native";
import { Header, Button, Spinner, Card, CardSection } from "./components/common";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBuBFNTd5AUQ2pVlfZZrmCZVBLE9P6O5-Y",
      authDomain: "auth-rnative.firebaseapp.com",
      databaseURL: "https://auth-rnative.firebaseio.com",
      projectId: "auth-rnative",
      storageBucket: "auth-rnative.appspot.com",
      messagingSenderId: "687477598040"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
    return (
      <Card>
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        </CardSection>
      </Card>
    );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
