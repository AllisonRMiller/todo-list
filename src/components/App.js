import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import TodoApp from './body';
import Navbar from "./navbar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: "ToDo" }
    this.updatePage = this.updatePage.bind(this);
  }

  async updatePage(newPage) {
    // console.log("in the update page function", newPage)
    // this.setState({ currentPage: newPage })
    // this.setState(function someFunction(param){
    // 	return { currentPage: newPage }
    // })
    await this.setState((prevState) => {
      // console.log(`in the set state method, 
      // this is what the previous state is:`, prevState)
      return { currentPage: newPage }
    })
    // console.log("after set state:", this.state)
  }
  render() {
    return (
      <div className="App">
        <Navbar
          updatePage={this.updatePage}
        />
        <header className="App-header">
          <p className="display4"
          >
            {this.state.currentPage}
          </p>
        </header>
        {
          this.state.currentPage === "ToDo" ?
            <TodoApp />
            :
            null
        }
        {/* {
          this.state.currentPage === "All" ?
            <All />
            :
            null
        }
        {
          this.state.currentPage === "Completed" ?
            <Completed />
            :
            null
        } */}
      </div>
    )
  }
}

export default App;
