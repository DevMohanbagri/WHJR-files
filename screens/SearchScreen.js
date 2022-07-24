import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import db from '../config.js';

export default class Search extends React.Component{
  constructor(props){
    super(props)
    this.state={
      allTransactions: [],

    }
  }

  componentDidMount=async()=>{
    var query = await db.collection('transactions').get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [...this.state.allTransactions,doc.data()]
      })
    })
  }
  render(){
    return(
      <View>
        <FlatList
          
            data = {this.state.allTransactions}
            renderItem = {({item})=>(
                <View  style = {{borderBottomWidth : 2}}>
                  <Text>{item.transactionType }</Text>
                  <Text>Book ID : {item.bookId }</Text>
                  <Text>Student ID : {item.studentId }</Text>
                  <Text>{item.date.toString() }</Text>
                </View>
              )
            }
            keyExtractor = {(item,index)=> index.toString() }

        />
          
        
        
        <Text>Issue or Return</Text>
      </View>
    )
  }
}