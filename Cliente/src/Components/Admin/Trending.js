import React from 'react';
import { Button } from '@material-ui/core'

export default class Trending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }

        this.getpro = this.getpro.bind(this);
    }

    getpro() {
        fetch("/Report/consult", {
            method: "GET", // "POST"
            //     headers: {
            //         Accept: "application/json, text/plain, */*",
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         nothing: "",
            //     })
        })
            .then(res => res.json())
            .then(res => this.setState({ query: res }))
        
    }


    render() {
        return (
            <div>
                <h1>Trending</h1>
                <Button onClick={()=>{this.getpro();console.log(this.state.query);}}>
                    Click 
                    </Button>

            </div>);
    }

}