import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import firebase from 'firebase';
import db from '../config.js';

export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermission: null,
            scanned : false,
            scannedData: '' ,
            buttonState: 'normal',
            scannedBookId: '',
            scannedStudentId: ''
        }
    }

    initiateBookIssue = async()=>{
      //add a transaction
      db.collection("transactions").add({
        'studentId': this.state.scannedStudentId,
        'bookId' : this.state.scannedBookId,
        'date' : firebase.firestore.Timestamp.now().toDate(),
        'transactionType': "issue"
      })
      //change book status - availability
      db.collection("books").doc(this.state.scannedBookId).update({
        'bookAvailability' : false
      })
      //change number  of issued books for student
      db.collection("students").doc(this.state.scannedStudentId).update({
        'noBooksIssued': firebase.firestore.FieldValue.increment(1)
      })

      this.setState({
        scannedStudentId: '',
        scannedBookId: ''
      })
      alert("Book issued!")
    }

    initiateBookReturn=async()=>{
      //add a transaction
      db.collection("transactions").add({
        'studentId': this.state.scannedStudentId,
        'bookId' : this.state.scannedBookId,
        'date' : firebase.firestore.Timestamp.now().toDate(),
        'transactionType': "return"
      })
      //change book status - availability
      db.collection("books").doc(this.state.scannedBookId).update({
        'bookAvailability' : true
      })
      //change number  of issued books for student
      db.collection("students").doc(this.state.scannedStudentId).update({
        'noBooksIssued': firebase.firestore.FieldValue.increment(-1)
      })
      this.setState({
        scannedStudentId: '',
        scannedBookId: ''
      })
      alert("Book issued!")
    }

    checkStudentEligibilityForIssue= async()=>{
      const studentRef = await db.collection('students').where("studentId","==", this.state.scannedStudentId).get()
      var studentEligible = ""
      if(studentRef.docs.length!=0){
        studentRef.docs.map((doc)=>{
          var student = doc.data()
          if( student.noBooksIssued<2){
            studentEligible = true
          }
          else{
            studentEligible = false
            alert("Student has already taken 2 books and they are not returned")
            this.setState({
              scannedBookId: '',
              scannedStudentId: ''
            })
          }
        })
      }
      else{
        studentEligible = false
        alert("This Student is existing")
      }
      return studentEligible
    }
    checkStudentEligibilityForReturn=async()=>{
      const transactionRef = await db.collection('transactions').where("bookId","==", this.state.scannedBookId).limit(1).get()
      var studentEligible = ""
      if(transactionRef.docs.length!=0){
        transactionRef.docs.map((doc)=>{
          var lastBookTransaction = doc.data()
          if(lastBookTransaction.studentId === this.state.scannedStudentId){
            studentEligible = true
          }
          else{
            studentEligible = false
            alert("This book was not taken by this student")
          }
        })
      }
      else{
        studentEligible = false
        alert("This Student is not existing")
        this.setState({
              scannedBookId: '',
              scannedStudentId: ''
            })
      }
      return studentEligible
    }
    checkBookEligibility = async ()=>{
      const bookRef = await db.collection('books').where("bookId","==", this.state.scannedBookId).get()
      var transactionType = ""
      if(bookRef.docs.length!==0){
        bookRef.docs.map((doc)=>{
          var book = doc.data()
          if(book.bookAvailability){
            transactionType = "issue"
          }
          else{
            transactionType = "return"
          }
        })
      }
      else{
        transactionType = "false"
      }
      return transactionType
    }

    handleTransaction=async()=>{
      var transactionmessage 
       //verify if the student is eligible for book issue or return or none

            //student id exists in the database

            //issue : number of book issued < 2
            //issue: verify book availability
            //return: last transaction -> book issued by the student id
     var transactionType = await this.checkBookEligibility();
   
      console.log("Transaction Type", transactionType)
      if (!transactionType) {
        Alert.alert("The book doesn't exist in the library database!")
        this.setState({
          scannedStudentId: '',
          scannedBookId: ''
        })
      }

      else if(transactionType === "issue"){
        var isStudentEligible = await this.checkStudentEligibilityForIssue()
        if(isStudentEligible)
          this.initiateBookIssue()
          Alert.alert("Book issued to the student!")     
      }

      else{
        var isStudentEligible = await this.checkStudentEligibilityForReturn()
        if(isStudentEligible)
          this.initiateBookReturn()
          Alert.alert("Book returned to the library!")
      }
       
    alert(transactionmessage);
    }

    getCameraPermission = async()=>{
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
            this.setState({
                hasCameraPermission:(status === 'granted')
            })
    }

    handleBarCodeScanned= async({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState : 'normal'
        })
    }
     
    

  render(){
      const hasCameraPermission = this.state.hasCameraPermission;
      const scanned =this.state.scanned 
      const buttonState = this.state.buttonState
    
      if(buttonState === 'clicked' && hasCameraPermission){
          return(
              <BarCodeScanner
              onBarCodeScanned={scanned ?undefined :this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
              />
          )
      }

      else if(buttonState==='normal'){
    return(

      <View style ={styles.container}>
          <View style={styles.inputView}>
            <TextInput style={styles.inputBox} placeholder= "bookId" 
            onChangeText={(text)=>{
                 this.setState({
                   scannedBookId: text
                 })
            }
            }/>

            <TouchableOpacity onPress={()=>{
            this.getCameraPermission()
            this.setState({
                scanned: false
            })
            }}
        style ={styles.scanButton}>
                <Text style = {styles.buttonText}>
                    Scan
                </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <TextInput style={styles.inputBox} placeholder= "studentId"
            onChangeText={(text)=>{
              this.setState({
                scannedStudentId: text
              })
         }}/>

            <TouchableOpacity onPress={()=>{
            this.getCameraPermission()
            this.setState({
                scanned: false
            })
            }}style ={styles.scanButton}>
                <Text style = {styles.buttonText}>
                    Scan
                </Text>
            </TouchableOpacity>
          </View>
          
        <Text style ={styles.displayText}>
            {hasCameraPermission? this.state.scannedData :"Request camera permission"}
        </Text>

        <TouchableOpacity style = {styles.scanButton} 
        onPress={async()=>{
          var transactionMessage = this.handleTransaction()
          console.log(transactionMessage);
        }}
        >
            <Text style = {styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    marginBottom: -5
  },
  buttonText:{
    fontSize: 20,
  },
    inputView:{
        flexDirection: 'row',
        margin: 20
    },
    inputBox:{
        width: 200, 
        height:40, 
        borderWidth: 1.5, 
        borderRightWidth: 0 ,
         fontSize: 20
    }
  });