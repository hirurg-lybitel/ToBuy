import * as React from "react";
import AppHeader from "../header";
import './app.scss'
import ProductList from "../product-list";
export default class App extends React.Component {
    render() {
        return (
            <div className="to-buy-app">
                <AppHeader/>
                <ProductList/>
            </div>
        )
    }
}
