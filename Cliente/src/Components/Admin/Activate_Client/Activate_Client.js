import React, { Component } from "react";
import { Select, Button } from '@material-ui/core';
import { JsonToTable } from "react-json-to-table";


class Admin_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algo: {
        Client: []
      },
      status: "Select",
      msj:''
    };
    this.handleClick = this.handleClick.bind(this);
    this.getClient = this.getClient.bind(this);
    this.getClient()
  }


  getClient() {
    fetch("/Client/consult", {
      method: "GET",
    })

      .then(res => res.json())
      .then(res => {
        if(res[0].bool){
          delete res[0].bool
          this.setState({ algo: { Client: [] } });
          this.setState({ algo: res[0] });
        }
      });

  }


  handleClick(e) {

    fetch("/Client/deactivate", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ client: this.state.status })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ algo: { Client: [] } });
      })
      .then(() => {
        console.log("safsadf")
        this.getClient()
      });
  }

  updateInputValue = (evt) => {
    this.setState({
      textBox: evt.target.value
    });
  }


  render() {
    console.log(this.state.algo)

    return (

      <div className='clientTable'>
        <br />
        <br />
        <JsonToTable json={this.state.algo} />
        <br />
        <Button id="desactivar" onClick={this.handleClick}>Activate/Deactivate&nbsp;</Button>
        <Select
          name="categoryName"
          value={this.state.status}
          onChange={(x) => this.setState({ status: x.target.value })}
          placeholder="Select a client:"
        >
          <option value="Select" >
            Select a client:
                    </option>
          {this.state.algo.Client.map(x =>
            <option value={x.username} key={x.username}>
              {x.username}
            </option>)}
        </Select>

      </div>);


  }
}

export default Admin_page;