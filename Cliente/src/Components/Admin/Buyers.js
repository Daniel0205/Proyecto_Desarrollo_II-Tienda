import 'date-fns';
import React from 'react';
import { Button } from '@material-ui/core'
import { JsonToTable } from "react-json-to-table";
import { HorizontalBar } from 'react-chartjs-2';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';



const Products = [{
    Order: '-', Username: '-', First_name: '-', Last_name: '-',
    Email: '-', Date: '-', Spent: '-'
}]


export default class Buyers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: [],
            table: [],
            chartData: [],
            initDate: new Date('2018-01-02'),
            finalDate: new Date()
        }

        this.showReport = this.showReport.bind(this);
        this.resJsonToTable = this.resJsonToTable.bind(this);
        this.resJsonToChart = this.resJsonToChart.bind(this);
        this.handleInitDateChange = this.handleInitDateChange.bind(this);
        this.handleFinalDateChange = this.handleFinalDateChange.bind(this);
    }


    showReport() {
        fetch("/Report/buyers", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                initDate: this.state.initDate,
                finalDate: this.state.finalDate
            })
        })
            .then(res => res.json())
            .then(res => { this.setState({ query: res }) })
            .then(() => { this.resJsonToTable() })
            .then(() => { this.resJsonToChart() });
    }


    /*Funcion para actualiazar la tabla con los datos
    que llega desde el sevidor */
    resJsonToTable() {

        let json = this.state.query;

        var table = [];
        var users = [];
        var result = [];

        for (let i = 0; i < json.length; i++) {
            let newjson = {};

            newjson.Order = '';
            newjson.Username = json[i]['bills'][0]['cards'][0]['username'];
            newjson.First_name = json[i]['bills'][0]['cards'][0]['client']['first_name'];
            newjson.Last_name = json[i]['bills'][0]['cards'][0]['client']['last_name'];
            newjson.Email = json[i]['bills'][0]['cards'][0]['client']['email'];
            newjson.Date = json[i]['bills'][0]['date']
            newjson.Price = parseInt(json[i]['price'], 10);
            newjson.Quantity = json[i]['bills'][0]['bill_book']['quantity'];
            newjson.Buy = newjson.Quantity * newjson.Price;

            table.push(newjson);
        }

        for (let index = 0; index < table.length; index++) {
            users[table[index]['Username']] = 0;
        }

        for (let index = 0; index < table.length; index++) {
            users[table[index]['Username']] += table[index]['Buy'];
        }

        for (let x in users) {
            let index = 0;
            while (index < table.length) {
                if (table[index].Username === x) {
                    table[index].Spent = users[x];
                    delete table[index].Price;
                    delete table[index].Buy;
                    delete table[index].Quantity;
                    result.push(table[index]);
                    break;
                }
                index++;
            }
        }
        //ordenado desc. por cantidad
        result = result.sort((a, b) => b.Spent - a.Spent);

        for (let index = 0; index < result.length; index++)
            result[index].Order = (index + 1) + '°';

        this.setState({ table: { Products: result } });
    }


    /*Funcion para actualiazar la grafica con los datos
    que llega desde el sevidor */
    resJsonToChart() {
        let data = {
            labels: [],
            datasets: [{
                label: "Money expended",
                backgroundColor: 'rgb(63, 81, 181)',
                borderColor: 'rgb(255, 255, 255)',
                data: [],
            }]
        }
        //Agregar datos recibidos del servidor
        let json = this.state.table.Products;
        for (let index = 0; index < json.length; index++) {
            data.labels[index] = json[index].Username;
            data.datasets[0]['data'][index] = json[index].Spent;
        }
        this.setState({ chartData: data });
    }


    //Funciones para almacenar las fechas seleccionadas
    handleInitDateChange(date) { this.setState({ initDate: date }) }
    handleFinalDateChange(date) { this.setState({ finalDate: date }) }


    componentDidMount() {
        this.setState({ table: { Products } });
    }


    render() {

        return (
            <div className="trending">
                <h1>Best Buyers</h1>
                {/*--Fecha inicial--*/}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        //fullWidth
                        margin="normal"
                        id="date-picker-dialog"
                        label="INITIAL DATE"
                        format="yyyy-MM-dd"
                        value={this.state.initDate}
                        onChange={this.handleInitDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/*--Fecha inicial--*/}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        //fullWidth
                        margin="normal"
                        id="date-picker-dialog"
                        label="FINAL DATE"
                        format="yyyy-MM-dd"
                        value={this.state.finalDate}
                        onChange={this.handleFinalDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>

                <br />
                <br />
                <Button variant="contained" color="primary" onClick={() => {
                    this.setState({ table: "" });
                    this.showReport();
                }}>
                    Show Report
                    </Button>

                <br /><br />
                <JsonToTable json={this.state.table} />
                <br />
                < HorizontalBar data={this.state.chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    min: 0
                                }
                            }]
                        }
                    }}
                    width={200}
                    height={30} />
            </div>
        );
    }

}


