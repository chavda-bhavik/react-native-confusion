import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, Share, StyleSheet, Alert,PanResponder } from "react-native";
import { Card, Icon, Rating, Input, Button} from "react-native-elements";
import * as Animatable from 'react-native-animatable'

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postComment, postFavorites } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorites(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

const RenderDish = (props) => {
    const dish = props.dish
    let view
    let handleViewRef = ref => { view = ref };
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if( dx < -200) 
            return true;
        else 
            return false;
    }
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if( dx > 200) 
            return true;
        else 
            return false;
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => {
            return true;
        },
        onPanResponderGrant: () => {
            view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            if(recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to Add '+dish.name+' to your favorites',
                    [
                        { text: 'Cancel', style: 'cancel', onPress: () => console.log("Cancel pressed") },
                        { text: 'Ok', style: 'default', onPress: () => props.favorite ? console.log('Already Favorite') : props.onPress() },
                    ],
                    { cancelable: false }
                )
            }
            if(recognizeComment(gestureState)) {
                props.toggleCommentDialog()
            }
            return true;
        }
    })
    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title +': '+message+' '+url,
            url: url
        }, {
            dialogTitle: 'Share '+title
        })
    }
    if(dish)
        return <Animatable.View 
                    animation="fadeInDown" 
                    duration={2000} 
                    delay={1000} 
                    ref={handleViewRef}
                    {...panResponder.panHandlers}
                >
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl+dish.image }}
                >
                <Text style={{ margin:10 }} >{dish.description}</Text>
                <View style={{ height:100, alignContent:'center', justifyContent:'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon 
                            raised 
                            reverse 
                            name={ props.favorite ? 'heart' : 'heart-o' }
                            type='font-awesome' 
                            color='#f50' 
                            onPress={() => props.favorite ? console.log('Already Favorite') : props.onPress() } 
                        />
                        <Icon 
                            raised 
                            reverse 
                            name='pencil'
                            type='font-awesome' 
                            color='purple' 
                            onPress={() => props.toggleCommentDialog() } 
                        />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            style={styles.cardItem}
                            onPress={() => shareDish(dish.name, dish.description, baseUrl+dish.image)}
                        />
                    </View>
                </View>            
            </Card>
        </Animatable.View>
    else 
        return <View />
}
const RenderComments = (props) => {
    const comments = props.comments;
    const renderCommentItem = ({item,index}) => {
        return (
            <View key={index} style={{margin:10, alignItems:'flex-start', }}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Rating imageSize={10} readonly startingValue={item.rating} />
                {/* <Text style={{fontSize:12}}>{item.rating} Stars</Text> */}
                <Text style={{fontSize:12}}>{'-- '+item.author+', '+new Intl.DateTimeFormat('en-US',{ year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(item.date))) }</Text>
            </View>
        )
    }
    return (
        <Card title="Comments">
            <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
        </Card>
    )
}

class DishDetail extends Component {
    state = {
        addComment: false,
        rating:3,
        author:'',
        comment: ''
    }
    addComment=()=>{
        let dishId = this.props.navigation.getParam('dishId','')
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.toggleCommentDialog();
    }
    cancelComment=()=>{
        this.props.navigation.navigate('Dishdetail', { dishId: dishId })
    }

    toggleCommentDialog=() => {
        this.setState(prevState => ({ addComment: !prevState.addComment}))
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }
    static navigationOptions = {
        title: 'DishDetails'
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId','')
        var body = (
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                    favorite={ this.props.favorites.some(el => el === dishId) }
                    onPress={ () => this.markFavorite(dishId) }
                    toggleCommentDialog={ () => this.toggleCommentDialog() }
                />
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                    <RenderComments comments={this.props.comments.comments.filter( comment => comment.dishId === dishId)} />
                </Animatable.View>
            </ScrollView>
        )
        if(this.state.addComment) {
            body = <View>
                    <Rating 
                        showRating 
                        fractions={1} 
                        startingValue={3}
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
        }
        return body
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

export default connect(mapStateToProps,mapDispatchToProps)(DishDetail)