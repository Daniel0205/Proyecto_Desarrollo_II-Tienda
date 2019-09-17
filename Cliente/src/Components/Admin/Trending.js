import 'date-fns';
import React from 'react';
import { Button } from '@material-ui/core'
import { JsonToTable } from "react-json-to-table";
import { HorizontalBar } from 'react-chartjs-2';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';



const Products = [{
    Item: "-", Isbn: "-", Date: "-", Quantity: "-",
    Title: "-", Author: "-", Distribution_point: "-"
}]


export default class Trending extends React.Component {
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
        fetch("/Report/consult", {
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
        console.log(json)
        let table = [];

        for (let i = 0; i < json.length; i++) {

            if (json[i]['books'].length > 0) {
                for (let j = 0; j < json[i]['books'].length; j++) {

                    let newjson = {};

                    newjson.Item = '';
                    newjson.Isbn = json[i]['books'][j]['bill_book']['isbn'];
                    newjson.Date = json[i]['date'];
                    newjson.Quantity = json[i]['books'][j]['bill_book']['quantity'];
                    newjson.Title = json[i]['books'][j]['title'];
                    newjson.Author = json[i]['books'][j]['author'];
                    newjson.Distribution_point = json[i]['books'][j]['bill_book']['name_dp'];

                    table.push(newjson);
                }
            }
        }

        //ordenado desc. por cantidad
        table = table.sort((a, b) => b.Quantity - a.Quantity);

        for (let index = 0; index < table.length; index++)
            table[index].Item = index;

        this.setState({ table: { Products: table } });
    }


    /*Funcion para actualiazar la grafica con los datos
    que llega desde el sevidor */
    resJsonToChart() {
        let data = {
            labels: [],
            datasets: [{
                label: "Sales",
                backgroundColor: 'rgb(63, 81, 181)',
                borderColor: 'rgb(255, 255, 255)',
                data: [],
            }]
        }
        //Agregar datos recibidos del servidor
        let json = this.state.table.Products;
        for (let index = 0; index < json.length; index++) {
            data.labels[index] = "item" + index.toString();
            data.datasets[0]['data'][index] = json[index].Quantity;
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
                <h1>Trending</h1>
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
                    height={50} />
            </div>
        );
    }

}


