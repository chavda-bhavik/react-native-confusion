import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon, Rating, Button } from 'react-native-elements'
import { postComment } from '../redux/ActionCreators'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

class AddComment extends Component {
    state = {
        rating:3,
        author:'',
        comment: ''
    }
    addComment=()=>{
        let dishId = this.props.navigation.getParam('dishId','')
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.props.navigation.navigate('Dishdetail', { dishId: dishId })
    }
    cancelComment=()=>{
        this.props.navigation.navigate('Dishdetail', { dishId: dishId })
    }
    render() {
        return (
            <View>
                <Rating 
                    showRating 
                    fractions={1} 
                    startingValue="{3}"
                    onFinishRating={(val) => this.setState({ rating: val})} 
                />
                <Input
                    onChangeText={(val) => this.setState({ author: val })}
                    value={this.state.author}
                    placeholder='Author'
                    leftIcon={
                        <Icon
                            type='font-awesome' 
                            name='user-o'
                            size={20}
                            color='black'
                        />
                    }
                />
                <Input
                    onChangeText={(val) => this.setState({ comment: val })}
                    value={this.state.comment}
                    placeholder='Comment'
                    leftIcon={
                        <Icon
                            type='font-awesome' 
                            name='comment-o'
                            size={20}
                            color='black'
                        />
                    }
                />
                <Button 
                    onPress={() => this.addComment()}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: '#4630eb',
                        color: 'white',
                        margin: '3px'
                    }}
                    title="Add Comment"
                />
                <Button 
                    onPress={() => this.cancelComment()}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: 'grey',
                        color: 'white',
                        margin: '3px'
                    }}
                    title="Cancle"
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        margin: 20
    },
    addCommentBtn: {
        alignItems: 'center',
        backgroundColor: '#4630eb',
        color: 'white'
    }
})
export default connect(null, mapDispatchToProps)(AddComment)