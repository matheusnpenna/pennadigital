import React from 'react';
import { CardDeck } from 'react-bootstrap';
import { SimpleCard } from '../../components';
import { FireStore } from '../../services';
import './styles.css';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      blogs: []
    }

    FireStore
    .collection('blogs')
    .get()
    .then((docs) => {
      const blogs = [];
      docs.forEach(element => {
        blogs.push(element.data());
      });
      this.setState({ blogs });
    }).catch(error => console.log(error));
  }

  // PRECISO IMPLEMENTAR O GRID E N CONSEGUI FAZER DESSE MODO AQUI
  // renderBlogs = () => {
  //   const { blogs } = this.state;
  //   const decks = [];
  //   let numberOfCards = 3;
  //   for (let i = 0 ; i < Math.round(blogs.length/3) ; i++){// control the number of decks
  //     decks.push(
  //       <CardDeck>
  //         {blogs
  //           .filter((blog, index) => (index <= numberOfCards) && (index > numberOfCards/2) && )//control the number of cards in one deck
  //           .map((blog, index) => {
  //               numberOfCards = numberOfCards * 2;
  //               return <SimpleCard key={blog.name+index} title={blog.name} text={blog.description} />;
  //         })}
  //       </CardDeck>
  //     );
  //   }
  //   return decks;
  // }
  
  render() {
    const { blogs } = this.state;
    const renderblogs = blogs.map((blog, index) => <SimpleCard key={blog.name+index} title={blog.name} text={blog.description} />);
    return (
      <div className="container-home">
          {/* {this.renderBlogs()} */}
          <CardDeck>
            {renderblogs}
          </CardDeck>
      </div> 
    );
    }
}

export default HomeScreen;
