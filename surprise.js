import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class SurpriseBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            newUserName: '',
            items: [],
            result: '',
            itemFromLocalStorage: [],
            btnClick: false,
            winerList: false
        }
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem('item'));
        if (data) {
            this.setState({
                itemFromLocalStorage: data,
                items: data
            });
        }
    }

    componentDidUpdate() {
        if (this.state.btnClick) {
            const data = JSON.parse(localStorage.getItem('item'));
            if (data) {
                this.setState({
                    itemFromLocalStorage: data,
                    btnClick: false
                });
            }
        }

    }

    onchangedName = (e) => {
        this.setState({ username: e.target.value })
    }

    onchangedNameNew = (e) => {
        this.setState({ newUserName: e.target.value })
    }

    winnerList = () => {
        this.setState({ winerList: true })
    }

    dataSubmit = () => {
        if (this.state.username.length > 0) {
            if (!this.state.items.includes(this.state.username)) {
                this.setState({
                    items: [...this.state.items, this.state.username],
                }, () => {
                    localStorage.setItem("item", JSON.stringify(this.state.items))
                    this.setState({
                        btnClick: true
                    })
                })
                this.setState({ username: "" })
            } else {
                alert('Entered value already present')
            }
        } else {
            alert("Please enter a UserName")
        }
    }

    getData = () => {
        if (this.state.items.includes(this.state.newUserName)) {
            this.setState({ result: "Winner" });
        } else {
            this.setState({ result: "Looser" });
        }
        this.setState({ newUserName: "" })
    }

    render() {
        return (
            <div>
                <h1>Surprise box task</h1>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>UserName</label>
                        <input type="text" className='form-control' value={this.state.username} onChange={this.onchangedName} placeholder='Enter UserName'/>
                    </div>
                    <div className='col-md-6 mt-4'>
                        <button type="" className='btn btn-primary' onClick={this.dataSubmit}>Submit</button>
                    </div>
                </div>

                <div className='col-md-12 mt-4'>
                    <button type="" className='btn btn-primary' onClick={this.winnerList}>Get Winner List</button>
                </div>
                {
                    this.state.winerList ?
                        <div>
                            <h3 className='mt-3'>List of Winner</h3>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Number</th>
                                        <th scope="col">UserName</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.itemFromLocalStorage.map((name, index) => (
                                            <tr>
                                                <td key={index}>{index + 1}</td>
                                                <td>{name}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    : null
                }

                <div className="form-row mt-5">
                    <div className="form-group col-md-6">
                        <input type="text" className='form-control' value={this.state.newUserName} onChange={this.onchangedNameNew} placeholder='Enter Name to see winner' />
                    </div>
                    <div className='col-md-6'>
                        <button type="button" className="btn btn-primary" onClick={this.getData}>Find Winner</button>
                    </div>
                </div>

                <h1>{this.state.result}</h1>

            </div>
        );
    }
}

export default SurpriseBox;
