import React from 'react';




class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: "", status: "ToDo", currentList: "All" };
        // this.showList = this.bind.showList(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.saveList = this.saveList.bind(this);
        this.updateList = this.updateList.bind(this);
        this.handleDoneEverything = this.handleDoneEverything.bind(this);
        this.resetTodo = this.resetTodo.bind(this);
    }

    async componentDidMount() {
        var oldItems = JSON.parse(window.localStorage.getItem("todos"));
        console.log(oldItems);
        if (oldItems === null) { return }
        else { await this.setState({ items: oldItems }) }
    }


    render() {
        let tempList = this.state.items;
        if (this.state.currentList === "ToDo"){tempList = this.state.items.filter((item) => item.status==="ToDo")}
        else if (this.state.currentList ==="Completed"){tempList = this.state.items.filter((item)=> item.status==="Completed")}
        
        return (
            <div>
                <div className="container">
                    <Navbar curList={this.state.currentList} />
                    <TodoList items={tempList}/>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="new-todo">
                            What needs to be done?
            </label>
                        <input
                            className="ml-2 mr-2"
                            id="new-todo"
                            onChange={this.handleChange}
                            value={this.state.text}
                            status={this.state.status}
                        />
                        <button>
                            +
                    </button>
                    </form>
                    <button className="mr-2" onClick={this.handleDoneEverything}>
                        Check All
                </button>
                    <button className="mr-2" onClick={this.resetTodo}>
                        Reset Checked
                </button>
                    <button className="mr-2" onClick={this.purgeComplete}>
                        Remove Checked
                </button>
                    <button onClick={this.saveList}>
                        Save List
                </button>
                </div>
            </div>
        );

    }


    // This doesn't work!!!!
    async updateList(e, newList) {

        e.preventDefault();
        console.log("updateList input: ", newList, this.props, this.state);
        await this.setState(state => ({
            currentList: newList
        }));
        console.log("new currentList: ", this.state.currentList)

    }


    async saveList() {
        await localStorage.setItem("todos", JSON.stringify(this.state.items))
    }



    handleChange(e) {
        e.preventDefault();
        this.setState({ text: e.target.value });
    }

    async handleDoneEverything() {
        const allItems = this.state.items;
        allItems.map((item) => item.status = item.status === "remove" ? "remove" : "Completed");
        await this.setState(state => ({
            items: allItems
        }))
    }

    async resetTodo() {
        const allItems = this.state.items;
        allItems.map((item) => item.status = item.status === "remove" ? "remove" : "ToDo");
        await this.setState(state => ({
            items: allItems
        }))
    }
    async purgeComplete() {
        const allItems = this.state.items;
        allItems.map((item) => item.status === "Complete" ? "remove" : item.status);
        await this.setState(state => ({
            items: allItems
        }))
    }

    async handleDone(e, item) {
        // this is check button
        e.preventDefault();
        const newItems = this.props.items;
        console.log(this.props.items);
        console.log("NI1: ", newItems);
        console.log("place: ", item.place);
        newItems.splice(
            item.place, 1, {
            text: item.text,
            id: item.id,
            place: item.place,
            status: item.status === "Completed" ? "ToDo" : "Completed"
        })
        console.log("NI2: ", newItems)
        await this.setState(state => ({
            items: newItems
        }))

        console.log("handleDone ran:", this.state.status)
    }

    async handleDelete(e, item) {
        // this is minus button

        e.preventDefault();
        const newItems = this.props.items;
        console.log(this.props.items);
        console.log("NI1: ", newItems);
        console.log("place: ", item.place);
        newItems.splice(
            item.place, 1, {
            text: item.text,
            id: item.id,
            place: item.place,
            status: item.status === "remove" ? "ToDo" : "remove"
        })
        console.log("NI2: ", newItems)
        await this.setState(state => ({
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
            status: "ToDo",
        }));
        console.log(this.state);
    }
}


class Navbar extends TodoApp {
    constructor(props) {
        super(props)
        this.navbarLinks = [
            "ToDo",
            "All",
            "Completed"
        ]
    }

    render() {
        const navLinksinHTML = this.navbarLinks.map((link, index) => {
            return (
                <React.Fragment key={index}>
                    <a
                        onClick={(e) => this.updateList(e, link)}
                        href="#"

                    >
                        {link}
                    </a>
                    {this.navbarLinks.length - 1 === index ? null : (<> | </>)}
                </React.Fragment>
            )
        })
        return (
            <h2 className="d-inline-flex">
                {navLinksinHTML}
            </h2>
        )
    }
}
class TodoList extends TodoApp {
    constructor(props) {
        super(props)
    }

    stylin(item) {
        var listStyle = "list-group-item";
        if (item.status === "Completed") { listStyle = listStyle + " text-success" }
        else if (item.status === "remove") { listStyle = listStyle + " text-danger" }
        return listStyle;

    }

    render() {
        return (
            <div className="row text-left">
                <div className="col">
                    <ul className="list-group">
                        {this.props.items.map(item => (
                            <li className={this.stylin(item)} key={item.id}>
                                {item.text}
                                <button className="ml-2" onClick={(e) => this.handleDone(e, item)}> Done </button>
                                <button onClick={(e) => this.handleDelete(e, item)}> Remove </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}


export default TodoApp;