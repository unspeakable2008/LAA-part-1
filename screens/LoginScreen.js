import React from "react"
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ToastAndroid,
    Alert,
    FlatList,
    Modal,
    ScrollView,
  } from "react-native";
  import firebase from "firebase"
  import { Header } from "react-native-elements"
  import { SafeAreaProvider } from "react-native-safe-area-context"; 
  export default class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state = {
    emailId:"",password:"",
    isModalVisible:"false",
    emailID:"",
    Password:"",
    confirmPassword:"",
    }
    }
    showModal = () => {
        return (
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.isModalVisible}
          >
            <View style={styles.modalContainer}>
              <ScrollView style={{ width: "100%" }}>
                <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                  <Text style={styles.modalTitle}>Sign Up</Text>
                  <TextInput
                    placeholder={"Email ID"}
                    style={styles.formTextInput}
                    keyboardType={"email-address"}
                    onChangeText={(text) => {
                      this.setState({
                        emailID: text,
                      });
                    }}
                  ></TextInput>
                  <TextInput
                    placeholder={"Password"}
                    style={styles.formTextInput}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({
                        password: text,
                      });
                    }}
                  ></TextInput>
                  <TextInput
                    placeholder={"Confirm Password"}
                    style={styles.formTextInput}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({
                        confirmPassword: text,
                      });
                    }}
                  ></TextInput>
                  <View>
                    <TouchableOpacity
                      style={styles.registerButton}
                      onPress={() => {
                        this.userSignUp(
                          this.state.emailID,
                          this.state.password,
                          this.state.confirmPassword
                        );
                      }}
                    >
                      <Text style={styles.registerButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        this.setState({ isModalVisible: false });
                      }}
                    >
                      <Text style={styles.registerButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </Modal>
        );
      };  
     login = async (emailID, password) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(emailID, password)
          .then(() => {
            //this.props.navigation.navigate("DonateBook")
      Alert.alert("Logged In")
          })
          .catch((error) => {
            var errorCode = error.error;
            var errorMessage = error.message;
            console.log(errorMessage);
          });
      };
    
      userSignUp = async (emailID, password, confirmPassword) => {
        if (password != confirmPassword) {
          return Alert.alert("Passwords do not match!");
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(emailID, password)
            .then(() => {
              db.collection("users").add({
                emailID: this.state.emailID,
              });
              return Alert.alert("User Sign Up Successful!!", "", [
                {
                  text: "Ok",
                  onPress: () => {
                    this.setState({ isModalVisible: false });
                  },
                },
              ]);
            })
            .catch((error) => {
              var errorCode = error.error;
              var errorMessage = error.message;
              console.log(errorMessage);
            });
        }
      };
    

      render() {
         return (
              <SafeAreaProvider>
                  <View>
                      {this.showModal()}
                  <Header
          centerComponent={{
            text: 'Life Assistance App',
            style: { color: 'Black', fontSize: 30 },
          }}></Header>
                  </View>
                  <View style = {styles.profileContainer}>
                      <Image source = {require("../assets/app logo.png")}
                      style = {{width:400,height:100}}
                      />
                  </View>
                  <View style = {{justifyContent:"center", alignItems:"center", marginTop:70}}>
                      <TextInput
                      pl  placeholder={"Email ID"}
                      placeholderTextColor={"black"}
                      style={styles.loginBox}
                      keyboardType={"email-address"}
                      onChangeText={(text) => {
                        this.setState({
                          emailID: text,
                        });
                      }}
                      >
                      </TextInput>
                      <TextInput
                       placeholder={"Password"}
                       placeholderTextColor={"black"}
                       style={styles.loginBox}
                       secureTextEntry={true}
                       onChangeText={(text) => {
                         this.setState({
                           password: text,
                         });
                       }}
                      ></TextInput>

                    <TouchableOpacity style = {{marginTop:60,backgroundColor:"red",width:100,height:40,borderRadius:8}}
                    onPress = {()=>{
                        this.login()
                    }}
                    >
                        <Text style = {{color:"black",textAlign:"center",fontSize:30}}>
                            Login
                        </Text>
                    </TouchableOpacity>
                       <Text style={{marginTop:70}}>{"Don't have an account"}</Text>
                       
                       <TouchableOpacity style = {{marginTop:20,backgroundColor:"red",width:100,height:40,borderRadius:8}} 
                       onPress = {()=>{
                        this.setState({
                        isModalVsible:True
                        })
                       }}
                       >
                        <Text style = {{color:"black",textAlign:"center",fontSize:15}}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                  </View>
                  
                  </SafeAreaProvider>

          )

        }
  }
  const styles = StyleSheet.create({
    profileContainer:{justifyContent:"center", alignItems:"center"},
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: "#ff8a65",
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
      },
  }) 