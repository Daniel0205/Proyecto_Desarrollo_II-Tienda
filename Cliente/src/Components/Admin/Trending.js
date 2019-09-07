import React from 'react';
import { Button } from '@material-ui/core'
import { JsonToTable } from "react-json-to-table";
import { HorizontalBar } from 'react-chartjs-2';


var data;

export default class Trending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: [],
            table: [],
            chartData: []
        }

        this.getpro = this.getpro.bind(this);
        this.resJsonToTable = this.resJsonToTable.bind(this);
        this.resJsonToChart = this.resJsonToChart.bind(this);
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

        var json = this.state.query;
        var table = [];

        for (let index = 0; index < json.length; index++) {

            var newjson = {};
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
        for (let index = 0; index < this.state.query.length; index++) {
            data.labels[index] = "item" + index.toString();
            data.datasets[0]['data'][index] = this.state.query[index]['bill_books'][0]['quantity'];
        }
        this.setState({ chartData: data });
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
                <Button onClick={() => {
                    this.setState({ table: "" });
                    this.getpro();
                }}>
                    Click
                    </Button>
                <br />
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


