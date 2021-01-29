import * as React from "react";
import ApiService from "../../services/api.service";

export default class ProductList extends React.Component {
    apiService = new ApiService()
    state = {
        results: []
    }

    componentDidMount() {
        this.apiService.getAllProducts().then((results) => {
            console.log(results)
            this.setState({
                results: results
            })
        })
    }

    render() {
        const elements = this.state.results.map(r => {
            return (<div>
                {r.name}
            </div>)
        });
        return (
            <div>
                {elements}
            </div>
        )
    }
}
