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
      msj: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.getClient = this.getClient.bind(this);
    this.nextBirthday = this.nextBirthday.bind(this);
    this.getClient()
  }


  getClient() {
    fetch("/Client/consult", {
      method: "GET",
    })

      .then(res => res.json())
      .then(res => {
        if (res[0].bool) {
          delete res[0].bool
          this.setState({ algo: { Client: [] } });
          this.nextBirthday(res[0]);
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
        this.getClient()
      });
  }

  updateInputValue = (evt) => {
    this.setState({
      textBox: evt.target.value
    });
  }

  nextBirthday(res) {
    let json = res.Client;

    for (let index = 0; index < json.length; index++) {
      if (parseInt(json[index]['date_birth'].substring(5, 7)) === (new Date()).getMonth() + 2) {
        json[index].next_birthday = "yes";
      }
      else {
        json[index].next_birthday = "no";
      }
    }

    this.setState({ algo: { Client: json } });
  }


  render() {

    return (

      <div className='clientTable'>
        <h1>Customers</h1>
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