import Telescope from 'meteor/nova:lib';
import React from 'react';
import { ListContainer } from "meteor/utilities:react-list-container";
import Categories from "meteor/nova:categories";
import Countries from "meteor/nova:countries";

const PostsListHeader = () => {

  return (
    <div>
      <div className="posts-list-header">
      <div className="posts-list-header-country">
          <ListContainer 
            collection={Countries}
            limit={0} 
            resultsPropName="countries" 
            component={Telescope.components.CountriesList}
            listId="countries"
          />
        </div>
        <div className="posts-list-header-categories">
          <ListContainer 
            collection={Categories} 
            limit={0} 
            resultsPropName="categories" 
            component={Telescope.components.CategoriesList}
            listId="categories"
          />
        </div>
        <Telescope.components.PostsViews />
        <Telescope.components.SearchForm/>
      </div>
    </div>
  )
}

PostsListHeader.displayName = "PostsListHeader";

module.exports = PostsListHeader;
export default PostsListHeader;
