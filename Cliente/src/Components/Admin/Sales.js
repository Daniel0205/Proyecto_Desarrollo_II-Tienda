import 'date-fns';
import React from 'react';
import { Button } from '@material-ui/core'
import { JsonToTable } from "react-json-to-table";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';



const Products = [{
    Item: "-", Distribution_Point: "-", Date: "-", Isbn: "-",
    Title: "-", Author: "-", Editorial: "-", Ed: "-",
    Subcategory: "-", Cost: "-", Price: "-", Qty: "-"
}]

var selectedProducts = [];



export default class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: [],
            table: [],
            initDate: new Date('2018-01-02'),
            finalDate: new Date(),
            selectedProduct: "All",
            backUp: [],
        }

        this.showResult = this.showResult.bind(this);
        this.resJsonToTable = this.resJsonToTable.bind(this);
        this.handleInitDateChange = this.handleInitDateChange.bind(this);
        this.handleFinalDateChange = this.handleFinalDateChange.bind(this);
        this.DateRanges = this.DateRanges.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    
    showResult() {
        fetch("/Report/sales", {
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
            .then(res => {
                this.setState({ query: res },
                    () => this.resJsonToTable());
            });
    }


    /*Funcion para actualiazar la tabla con los datos
    que llega desde el sevidor */
    resJsonToTable() {

        let json = this.DateRanges();
        var books = [];
        var table = [];
        var TotalSales = 0;
        var TotalProfit = 0;

        //Extraer solo los libros de todas las facturas
        for (let i = 0; i < json.length; i++) {
            for (let j = 0; j < json[i]['books'].length; j++) {
                json[i]['books'][j].date = json[i]['date'];
                books.push(json[i]['books'][j]);
            }
        }

        selectedProducts = [];

        //Extraer la informacion de cada libro
        for (let index = 0; index < books.length; index++) {

            let newjson = {};
            newjson.Item = index;
            newjson.Distribution_Point = books[index]['bill_book']['name_dp'];
            newjson.Date = books[index]['date'];
            newjson.Isbn = books[index]['isbn'];
            newjson.Title = books[index]['title'];
            newjson.Author = books[index]['author'];
            newjson.Editorial = books[index]['editorial'];
            newjson.Ed = books[index]['edition'] + '°';
            newjson.Subcategory = books[index]['name_subcategory'];
            newjson.Cost = '$' + books[index]['cost'];
            newjson.Price = '$' + books[index]['price'];
            newjson.Qty = books[index]['bill_book']['quantity'];

            TotalSales += books[index]['price'] * books[index]['bill_book']['quantity'];
            TotalProfit += (books[index]['price'] - books[index]['cost'])
                * books[index]['bill_book']['quantity'];

            table.push(newjson);

            //Select Products
            selectedProducts.push('item'+index+' - '+books[index]['title']);
            //
        }

        //Activa mostar la tabla
        this.setState({
            table: {
                Products: table,
                '': '',
                'Total Sales': '$' + TotalSales,
                'Total Profit': '$' + TotalProfit
            }
        });

        //Backup
        //Activa mostar la tabla
        this.setState({
            backUp: {
                Products: table,
                '': '',
                'Total Sales': '$' + TotalSales,
                'Total Profit': '$' + TotalProfit
            }
        });
    }


    //Funciones para almacenar las fechas seleccionadas
    handleInitDateChange(date) { this.setState({ initDate: date }) }
    handleFinalDateChange(date) { this.setState({ finalDate: date }) }


    onSelect(event){
        let selectedItem = event.target.value;
        this.setState({ selectedProduct: selectedItem });
        if (selectedProducts.length > 0) {
    
            if (typeof this.state.backUp.Products[selectedItem] !== "undefined") {

                let qty = this.state.backUp.Products[selectedItem].Qty;
                let price = this.state.backUp.Products[selectedItem].Price;
                let cost = this.state.backUp.Products[selectedItem].Cost;
                price = parseInt(price.substring(1) , 10);
                cost = parseInt(cost.substring(1) , 10);
                
                this.setState({
                    table: {
                        Product: this.state.backUp.Products[selectedItem],
                        '': '',
                        'Total Sale': '$' + (qty*price),
                        'Total Profit': '$' + (price-cost)*qty
                    }
                });

            }
            else {
                this.setState({ table: this.state.backUp });
            }
        }
    }


    //Funcion para sacar los datos del query a la bd 
    DateRanges() {
        let result = [];
        for (let index = 0; index < this.state.query.length; index++) {
            result.push(this.state.query[index]);
        }
        return result;
    }


    componentDidMount() {
        this.setState({ table: Products });
        this.setState({ backUp: Products });
    }


    render() {

        return (
            <div className="trending">
                <h1>Sales</h1>
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
                    this.setState({ backUp: "" });
                    this.showResult();
                }}> Show Report </Button>
                <br /><br />

                <br /><br />
                <Divider/>
                <br />

                <FormControl>
                    <InputLabel shrink htmlFor="age-label-placeholder">
                        FILTER PRODUCT  </InputLabel>
                    <Select
                        style={{ maxWidth: '510px', minWidth: '510px' }}
                        
                        onChange={this.onSelect}
                        name="product"
                        defaultValue='all'
                        displayEmpty
                        >
                            
                        <MenuItem key='all' value=''> All </MenuItem>
                        {selectedProducts.map((color, index) =>
                            <MenuItem key={index} value={index}> {color}</MenuItem>
                        )}

                    </Select>
                </FormControl>

                <br /><br />
                <JsonToTable json={this.state.table} />
                <br /><br /><br />

            </div>
        );
    }

}



