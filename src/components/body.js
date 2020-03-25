import React from 'react';

// import ReactDOM from 'react-dom';




// class Body extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = { currentList: "todo" };
//         this.showList = this.bind.showList(this);
//         this.updateList = this.bind.updateList(this);
//     }

//     showList() {
//         this.state = 
//     }

// }



// class Body extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = { currentList: "toDoList"}
//         this.showList = this.bind.showList(this);
//     }



//     showList(e){
//         this.setState = {list: e.target.id} 
//     }
// }

// Filter items by this.state.status
// done: classname = muted <s>
// deleted: classname = font-danger <s>

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: "", status: "todo", };
        // this.showList = this.bind.showList(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    //     async componentDidMount() {
    // 		console.log("the component did mount")
    // {
    //             await window.localStorage.setItem("todos", JSON.stringify(this.state.items));
    //         }}

    
    render() {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
            </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                        status={this.state.status}
                    />
                    <button>
                        +
                    </button>
                </form>
            </div>
        );

    }
    // this function doesn't do anything yet but will be included in the filter
    // checkStatus() {
    //     console.log("checkStatus ran", linkname)
    //     return this.state.status == linkname
    // }

    plusButton(e) {
        // open and edit the line
        // add a new blank line if there is not currently a blank line
    }


    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    async handleDone(prevState) {
        // this is check button
        await this.setState({ status: "done" })
        console.log("handleDone ran:", this.state.status)
    }

    handleDelete(prevState) {
        // this is minus button
        this.setState({ status: "remove" })
        console.log("handleDelete ran:", this.state.status)
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now(),
            status: this.state.status
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: '',
            status: "todo",
        }));
        console.log(this.state);
    }
}

class TodoList extends TodoApp {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="row text-center">
                <div className="col">
                    <ul className="list-group">
                        {this.props.items.map(item => (
                            <li className="list-group-item" key={item.id}>{item.text}
                                <button onClick={this.handleChange}>+</button>
                                <button onClick={this.handleDone}>f00c</button>
                                <button onClick={this.handleDelete}>-</button></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

// ReactDOM.render(
//     <TodoApp />,
//     document.getElementById('todos-example')
// );

export default TodoApp;