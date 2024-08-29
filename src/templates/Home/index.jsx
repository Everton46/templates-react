import { Component } from 'react';

import './styles.css';

import {Posts} from '../../components/Posts';
import {loadPosts} from '../../utils/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


export class Home extends Component {
state = {
  posts: [],
  allPosts: [],
  page: 0,
  postsPerPage: 10,
  searchValue: ''
};

//metodo de montagem
async componentDidMount(){
  await this.loadPosts()//chamando a funçao pra dentro do metodo 
}

//função criada
loadPosts = async () => {
  const {page, postsPerPage} = this.state;

  const postsAndPhotos = await loadPosts();
  this.setState({
    posts: postsAndPhotos.slice(page, postsPerPage),
    allPosts: postsAndPhotos,
  });
}

loadMorePosts = () => {
  const {
    page,
    postsPerPage,
    allPosts,
    posts
  }  = this.state;
  const nextPage = page + postsPerPage;
  const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
  posts.push(...nexPosts);

  this.setState({posts, page: nextPage });
}

handleChange = (e) => {
  const { value } = e.target;
  this.setState({searchValue: value});
}
  //renderizar os dados na tela
  render() {
   const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
   const noMorePosts = page + postsPerPage >= allPosts.length;

   //fazendo a busca de post de acordo com valor digitado
  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLowerCase()
      );
  })
  : posts;

   return (
    <section className="container">
      <div class="search-container">
        {!!searchValue && (
          <h1>Valor de pesquisa: {searchValue}</h1>
        )}
 
        <TextInput searchValue={searchValue} handleChange={this.handleChange} />
      </div>

      {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts = (</p>
        )}
        
        <div className="button-container">
          {!searchValue && (
            <Button 
              text="Ver mais!"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />            
          )}
        </div>
    </section>
    );
  }
}
export default Home;
