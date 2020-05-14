import React from 'react';
import Map from './map';
import Nav from './nav';


class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         loaded: false
    //     };
    // }

    // componentDidMount() {
    // }


    render() {
        return (
            <div id='container'>
                <Nav></Nav>
               <Map></Map>
            </div>
        )

    }
}

export default App;