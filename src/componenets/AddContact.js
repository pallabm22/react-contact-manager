import React from "react";

class AddContact extends React.Component{
    state = {
        name: "",
        email: "",
    };
    add = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("all fields are mandetory!");
            return;
        }
        this.props.AddContactHandler(this.state);
        this.setState({ name: "", email: "" });
        this.props.navigate("/");
    };
    cancel = (e) => {
        this.props.navigate("/");
    };

    render() {
        return (
            <div className="ui main">
                <h2>AddContact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" value={this.state.name } onChange={(e)=>this.setState({name:e.target.value})}></input>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" value={this.state.email } onChange={(e)=>this.setState({email:e.target.value})}></input>
                    </div>
                    <button className="ui button blue">Add</button>
                    <button type="button" className="ui button red" onClick={this.cancel}>Cancel</button>
                </form>
            </div>
        );
    }
}
export default AddContact;