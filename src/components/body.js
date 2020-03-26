import React from 'react';



// change currentlist in state based on clicking in navbar, possibly move this function to app



class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: "", status: "todo", currentList: "all" };
        // this.showList = this.bind.showList(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDone = this.handleDone.bind(this);
        // this.checkStatus = this.checkStatus.bind(this);
    }

    
    
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
    
    async componentDidMount() {
        console.log("the component did mount")
{
            await window.localStorage.setItem("todos", JSON.stringify(this.state.items));
        }}
    
    plusButton(e) {
        // open and edit the line
    }


    handleChange(e) {
        e.preventDefault();
        this.setState({ text: e.target.value });
        console.log("handle change ran")
    }

    handleDone(e,text,id,place) {
        // this is check button
        e.preventDefault();
        const newItems = this.props.items;
        console.log(this.props.items);
        console.log("NI1: ",newItems);
        console.log("place: ",place);
        newItems.splice(
            place, 1, {
            text: text,
            id: id,
            place: place,
            status: "done"})
            console.log("NI2: ",newItems)
        this.setState(state => ({
            items: newItems
            }))
        
        console.log("handleDone ran:", this.state.status)
    }

    handleDelete(e,text,id,place) {
        // this is minus button

        e.preventDefault();
        const newItems = this.props.items;
        console.log(this.props.items);
        console.log("NI1: ",newItems);
        console.log("place: ",place);
        newItems.splice(
            place, 1, {
            text: text,
            id: id,
            place: place,
            status: "remove"})
            console.log("NI2: ",newItems)
        this.setState(state => ({
            items: newItems
            }))
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
            place: this.state.items.length,
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
                        {this.props.items.filter(x => { console.log("checkStatus ran", x.status); return (this.state.currentList === "all" ? x : x.status === this.state.currentList) }).map(item => (
                            <li className="list-group-item" key={item.id}>{item.text}
                                {/* <button onClick={this.handleChange}>+</button> */}
                                <button onClick={(e) => this.handleDone(e,item.text,item.id,item.place)}>f00c</button>
                                <button onClick={(e) => this.handleDelete(e,item.text,item.id,item.place)}>-</button></li>
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