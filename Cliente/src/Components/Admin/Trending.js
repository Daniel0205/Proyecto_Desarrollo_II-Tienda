import 'date-fns';
import React from 'react';
import { Button } from '@material-ui/core'
import { JsonToTable } from "react-json-to-table";
import { HorizontalBar } from 'react-chartjs-2';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';


var data;

export default class Trending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: [],
            table: [],
            chartData: [],
            initDate: new Date(),
            finalDate: new Date()
        }

        this.getpro = this.getpro.bind(this);
        this.resJsonToTable = this.resJsonToTable.bind(this);
        this.resJsonToChart = this.resJsonToChart.bind(this);
        this.handleInitDateChange = this.handleInitDateChange.bind(this);
        this.handleFinalDateChange = this.handleFinalDateChange.bind(this);
        this.filterDateRanges = this.filterDateRanges.bind(this);
    }

    getpro() {
        fetch("/Report/consult", {
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ query: res },
                    () => this.resJsonToTable());
            });
    }


    /*Funcion para actualiazar la tabla con los datos
    que llega desde el sevidor */
    resJsonToTable() {

        let json = this.filterDateRanges();
        let table = [];

        for (let index = 0; index < json.length; index++) {

            let newjson = {};
            newjson.Item = index;
            newjson.Bill = json[index]['id_bill'];
            newjson.Date = json[index]['date'];
            newjson.Quantity = json[index]['bill_books'][0]['quantity'];
            newjson.Title = json[index]['bill_books'][0]['book']['title'];
            table.push(newjson);
        }

        this.setState({ table: { Products: table } });
        this.resJsonToChart();
    }


    /*Funcion para actualiazar la grafica con los datos
    que llega desde el sevidor */
    resJsonToChart() {
        data = {
            labels: [],
            datasets: [{
                label: "Sales",
                backgroundColor: 'rgb(63, 81, 181)',
                borderColor: 'rgb(255, 255, 255)',
                data: [],
            }]
        }
        //Agregar datos recibidos del servidor
        let json = this.filterDateRanges();
        for (let index = 0; index < json.length; index++) {
            data.labels[index] = "item" + index.toString();
            data.datasets[0]['data'][index] = json[index]['bill_books'][0]['quantity'];
        }
        this.setState({ chartData: data });
    }


    //Funciones para almacenar las fechas seleccionadas
    handleInitDateChange(date) { this.setState({ initDate: date }) }
    handleFinalDateChange(date) { this.setState({ finalDate: date }) }


    //Funcion para filtrar por rangos las fechas a mostar
    filterDateRanges() {

        let filteredQuery = [];
        let result = [];

        //final date
        let fDay = parseInt(this.state.finalDate.toString().substring(8, 10));
        let fMonth = this.state.finalDate.getMonth() + 1;
        let fYear = this.state.finalDate.getFullYear();

        for (let index = 0; index < this.state.query.length; index++) {

            if (parseInt((this.state.query[index]['date']).substring(0, 4), 10) < fYear) {
                filteredQuery.push(this.state.query[index]);
            }
            else if (parseInt((this.state.query[index]['date']).substring(0, 4), 10) === fYear) {

                if (parseInt((this.state.query[index]['date']).substring(5, 7), 10) < fMonth) {
                    filteredQuery.push(this.state.query[index]);
                }
                else if (parseInt((this.state.query[index]['date']).substring(5, 7), 10) === fMonth) {

                    if (parseInt((this.state.query[index]['date']).substring(8, 10), 10) <= fDay) {
                        filteredQuery.push(this.state.query[index]);
                    }
                }
            }

        }

        //initial date
        let iDay = parseInt(this.state.initDate.toString().substring(8, 10));
        let iMonth = this.state.initDate.getMonth() + 1;
        let iYear = this.state.initDate.getFullYear();

        for (let index = 0; index < filteredQuery.length; index++) {

            if (parseInt((filteredQuery[index]['date']).substring(0, 4), 10) > iYear) {
                result.push(filteredQuery[index]);
            }
            else if (parseInt((filteredQuery[index]['date']).substring(0, 4), 10) === iYear) {

                if (parseInt((filteredQuery[index]['date']).substring(5, 7), 10) > iMonth) {
                    result.push(filteredQuery[index]);
                }
                else if (parseInt((filteredQuery[index]['date']).substring(5, 7), 10) === iMonth) {

                    if (parseInt((filteredQuery[index]['date']).substring(8, 10), 10) >= iDay) {
                        result.push(filteredQuery[index]);
                    }
                }
            }

        }

        return result;
    }


    componentDidMount() {
        this.setState({
            table:
            {
                Products:
                    [{ Item: "-", Bill: "-", Date: "-", Quantity: "-", Title: "-" }]
            }
        });
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
                    this.getpro();
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


