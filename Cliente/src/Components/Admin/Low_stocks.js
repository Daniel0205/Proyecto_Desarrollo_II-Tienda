import React from 'react';
import { JsonToTable } from "react-json-to-table";
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';


class Low_stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: [],
      table: [],
      quantity: 0
      //chartData: [],
    }

    this.showReport = this.showReport.bind(this);
    this.resJsonToTable = this.resJsonToTable.bind(this);
    this.DateRanges = this.DateRanges.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.setDefault = this.setDefault.bind(this);
  }


  showReport() {

    fetch("/Report/low_stocks", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: this.state.quantity,
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ query: res },
          () => this.resJsonToTable());
      });
  }


  /*Funcion para actualiazar la tabla con los datos   !isNaN(number)
  que llega desde el sevidor */
  resJsonToTable() {

    let json = this.DateRanges();
    let table = [];

    for (let index = 0; index < json.length; index++) {

      let newjson = {};
      newjson.Item = index;
      newjson.Isbn = json[index]['isbn'];
      newjson.Availability = json[index]['availability'];
      newjson.Department = json[index]['name_dp'];
      newjson.Title = json[index]['book']['title'];
      newjson.Author = json[index]['book']['author'];
      newjson.Pages = json[index]['book']['number_of_pages'];
      newjson.Editorial = json[index]['book']['editorial'];
      newjson.Edition = json[index]['book']['edition'];
      newjson.Language = json[index]['book']['lang'];
      newjson.Subcategory = json[index]['book']['name_subcategory'];
      table.push(newjson);
    }

    if (table.length === 0) {
      this.setDefault();
    }
    else {
      this.setState({ table: { Products: table } });
      //this.resJsonToChart();
    }
  }



  //Funcion para filtrar por rangos las fechas a mostar
  DateRanges() {

    let result = [];
    for (let index = 0; index < this.state.query.length; index++) {
      result.push(this.state.query[index]);
    }

    return result;
  }

  handleDateChange(number) {

    (number.target.value === "") ?
      this.setState({ quantity: 0 }) :
      this.setState({ quantity: number.target.value })
  }

  setDefault() {
    this.setState({
      table:
      {
        Products:
          [{ Item: "-", Isbn: "-", Availability: "-", Department: "-", Title: "-" }]
      }
    });
  }

  componentDidMount() {
    this.setDefault();
  }


  render() {

    return (
      <div>

        <h1>Availability</h1>

        <Button variant="outlined" color="primary"
          style={{ maxWidth: '34px', minWidth: '34px', maxHeight: '40px', minHeight: '40px' }}
          onClick={() =>
            (this.state.quantity > 0) ? this.setState({ quantity: this.state.quantity - 1 }) : ''
          }>
          -
            </Button>

        <TextField
          value={this.state.quantity}
          label="Max quantity"
          id="outlined-dense"
          defaultValue="0"
          margin="dense"
          variant="outlined"
          onChange={this.handleDateChange}
          style={{ width: 100, margin: 0 }}

        />

        <Button variant="outlined" color="primary"
          style={{ maxWidth: '34px', minWidth: '34px', maxHeight: '40px', minHeight: '40px' }}
          onClick={() => this.setState({ quantity: this.state.quantity + 1 })}>
          +
            </Button>

        <br />
        <br />

        <Button variant="contained" color="primary" onClick={() => {
          this.setState({ table: "" });
          this.showReport();
        }}> Show Report </Button>

        <br />
        <br />

        <JsonToTable json={this.state.table} />

        <br />
      </div>);
  }
}

export default (Low_stocks); 