import React from 'react';
import { StyleSheet, Text, View, SearchBar, ScrollView } from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class ReadStory extends React.Component(){
    constructor(){
        super()
        this.state={
            search: '',
            allStories: []
        }
    }

    componentDidMount(){
        this.retriveStories();
    }

    retriveStories=async()=>{
        var storyList = db.collection('stories').get()
        storyList.docs.map((docs)=>{
            this.setState({
                allStories: docs.data()
            })
        })
        console.log(storyList + "hi")
    }

    /*searchFilter=async()=>{
        var storyList = await db.collection('stories').where('Title', '==', this.state.search).get()
        storylist.docs.map((doc)=>{
            
            
        })
    }*/


    render(){
        const {search} = this.state
        return(
            <View>
                <SearchBar
                    placeholder="Type Here..."
                    value={search}
                />
                <ScrollView
                
                
                />

                
            </View>
        );
    }
}