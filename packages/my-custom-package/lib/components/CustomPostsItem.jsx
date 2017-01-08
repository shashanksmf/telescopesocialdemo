import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { ModalTrigger } from "meteor/nova:core";
import { Link } from 'react-router';
import Posts from "meteor/nova:posts";
import Categories from "meteor/nova:categories";
//console.log("Telescope",Telescope);
class CustomPostsItem extends Telescope.components.PostsItem {
  componentWillReceiveProps(props){
  }
  
  renderCategories() {
    return this.props.post.categoriesArray ? <Telescope.components.PostsCategories post={this.props.post} /> : "";
  }

  renderCommenters() {
    return this.props.post.commentersArray ? <Telescope.components.PostsCommenters post={this.props.post}/> : "";
  }
  
  render() {
    var itemPriceCountry = {};
    var countryName='';
    if (typeof window === 'object') {
       countryName = (this.props.userCountry != undefined && this.props.userCountry.length >0) ? this.props.userCountry : (window == undefined ? '':window.localStorage.getItem("userCountry"));    
    } 

    else {
           countryName = (this.props.userCountry != undefined && this.props.userCountry.length >0) ? this.props.userCountry : '';    
     }
    
    const post = this.props.post;
  	console.log("post :ss",this.props,"countryName : ",countryName);
    if(this.props.post.hasOwnProperty("customArray11")){
      if(this.props.post.customArray11.constructor === Array){
        this.props.post.customArray11.forEach(function(items){
          if(items){
            if(items.hasOwnProperty("country") && countryName != null && countryName.length > 1 ){

              if(items.country.trim().toLowerCase() == countryName.trim().toLowerCase()){
                itemPriceCountry.countryName = countryName; 
              
                if(items.hasOwnProperty("price")){
                  itemPriceCountry.price =  items.price;  
                }

                if(items.hasOwnProperty("currencyIcon")){
                  itemPriceCountry.currencyIcon =  items.currencyIcon;  
                }

                if(items.hasOwnProperty("reldate")){
                  itemPriceCountry.relDate = items.reldate == undefined ? '' : (items.reldate); 
                }

               
              }
              else{

                //  itemPriceCountry.countryName = 'USA'; 
              
                // if(items.hasOwnProperty("price")){
                //   itemPriceCountry.price =  items.price;  
                // }

                // if(items.hasOwnProperty("relDate")){
                //   itemPriceCountry.relDate = items.relDate == undefined ? '' : items.relDate; 
                // } 
                 
              }
            }

          }

        })
      }
    }

    console.log("itemPriceCountry : ",itemPriceCountry);
    let postClass = "posts-item"; 
    if (post.sticky) postClass += " posts-sticky";

    // ⭐ custom code starts here ⭐
    if (post.color) {
      postClass += " post-"+post.color;
    }
	
    // ⭐ custom code ends here ⭐

    return (
      <div className={postClass}>
        {(post.thumbnailUrl || post.image) ? <Telescope.components.PostsThumbnail post={post}/> : null}

        <div className="posts-item-content">
          
          <h3 className="posts-item-title ">
            <Link to={Posts.getLink(post)} className="posts-item-title-link" target={Posts.getLinkTarget(post)}>
              {post.title}
            </Link>
           <div className="priceWrapper">
                <span className="currencyIcon">
                      <i className={itemPriceCountry.currencyIcon} ></i>
                </span>  

              <span className="price">
                    {(itemPriceCountry.countryName != undefined && itemPriceCountry.countryName != null) ? (itemPriceCountry.price) :'' } 
              </span>  
           </div>

           
          </h3>
		  
          
          <div className="posts-item-meta">
            {post.user? <div className="posts-item-user"><Telescope.components.UsersAvatar user={post.user} size="small"/><Telescope.components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date"><FormattedRelative value={post.postedAt}/></div>
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
              </Link>
            </div>
			
			
			
            {this.context.currentUser && this.context.currentUser.isAdmin ? <Telescope.components.PostsStats post={post} /> : null}
            {this.renderActions()}
          </div>
          <div className="commnetorsCategoriesContainer">
          
            {this.renderCommenters()}
    				{this.renderCategories()}
         </div>
		</div>

       
        
       <div className="customDatePriceCountry">
             
            <div className="dateContainer">
            
               <span className="month">
                    {moment(itemPriceCountry.relDate).format('MMM')} 
              </span>
              <span className="day">
                    {moment(itemPriceCountry.relDate).format('DD')} 
              </span>
              <span className="year">
                    {moment(itemPriceCountry.relDate).format('gggg')} 
              </span>
             </div>  
              <div className="posts-item-vote customVote">
                  

                <Telescope.components.Vote  post={post} />
              </div>

          </div>


      </div>
    )
  }
};
  
CustomPostsItem.propTypes = {
  post: React.PropTypes.object.isRequired
}

CustomPostsItem.contextTypes = {
  currentUser: React.PropTypes.object
};

export default CustomPostsItem;

// <span className="relDate">
//                  {(itemPriceCountry.countryName != undefined && itemPriceCountry.countryName != null) ? (itemPriceCountry.relDate==undefined ?'' : itemPriceCountry.relDate) :'' }
//           </span>
 // <span className="countryName">
 //                    {(itemPriceCountry.countryName != undefined && itemPriceCountry.countryName != null) ? (itemPriceCountry.countryName):''} 
 // //              </span>
 // //  {(itemPriceCountry.relDate)}
 // items.reldate.getDate()+'/'+(items.reldate.getMonth() + 1)+'/'+ items.reldate.getYear()