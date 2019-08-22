import React, { Component } from "react";
import { Select, Button } from '@material-ui/core';
import { JsonToTable } from "react-json-to-table";
import "./Activate_Client.css"


class Admin_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algo: {
        Client: []
      },
      status: "Select"
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
        this.setState({ algo: { Client: [] } });
        this.setState({ algo: res[0] });
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


  render() {
    console.log(this.state.algo)

    /*
        const tab = (
          <tbody>
            <tr>
              <td >1</td>
              <td>2</td>
              <button>b</button>
            </tr>
        </tbody>);*/

    return (
      // <div>
      //   <Dashboard handleList={this.handleList}/>
      //   <button onClick={this.handleClick}>Clientes</button>
      //   <ul>
      //   {result.map(item => {
      //       return <li>{item[1]}</li>;
      //     })}
      //   </ul>
      //   </div>);

      <div className='clientTable'>
        <br /><br />
        <JsonToTable json={this.state.algo} />
        <br />
        <Button id="desactivar" onClick={this.handleClick}>activate/deactivate</Button>
        <Select
          name="categoryName"
          value={this.state.status}
          onChange={(x) => this.setState({ status: x.target.value })}
          placeholder="Selecciona una subcategoria:"
        >
          <option value="Select" >
            Selecciona una categoria:
                    </option>
          {this.state.algo.Client.map(x =>
            <option value={x.username} key={x.username}>
              {x.username}
            </option>)}
        </Select>


        {/* <Table id="table" border="1">
          <th>username</th>  <th>first_name</th> <th>last_name</th>
          <th>date_birth</th> <th>type_id</th> <th>id</th>
          <th>phone_number</th> <th>address</th> <th>email</th>
          <th>state</th><th>change</th>

{tab} */}

        {/* <tr>
            <td >1</td>
            <td>2</td>
            <button>b</button>
          </tr>

          <tr>
            <td>3</td>
            <td>4</td>
            <button>b</button>
          </tr> */}

        {/* </Table> */}




      </div>);


  }
}

export default Admin_page;