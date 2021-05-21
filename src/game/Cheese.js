import { render } from '@testing-library/react';
import React,{Component} from 'react';
import './Cheese.css';


function Cheese (props){
        let cheeses = []

        props.color.forEach((color)=>{
            cheeses.push(<div className={"piece " + color}></div>)})
        //cheeses.push(<div className={"piece " + "blue"}></div>)
        //cheeses.push(<div className={"piece " + "yellow"}></div>)
        //cheeses.push(<div className={"piece " + "brown"}></div>)
        //cheeses.push(<div className={"piece " + "orange"}></div>)
        //cheeses.push(<div className={"piece " + "pink"}></div>)
        //cheeses.push(<div className={"piece " + "green"}></div>)
        return (
            <div className = "cheese">
                {cheeses}
            </div>
        );

}
export default Cheese;