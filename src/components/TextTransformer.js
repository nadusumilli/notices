import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TextTransformer extends Component {
    constructor(props){
        super(props);
        // Creating a ref for the notification div.
        this.notificationDiv = React.createRef();
    }
    
    state = {
        currentValue: '',
        status: null,
        message: null
    }

    static propTypes = {
        mode: PropTypes.oneOf(['lower', 'upper']),
        transformToLowerCase: PropTypes.func.isRequired,
        transformToUpperCase: PropTypes.func.isRequired,
        transformedValue: PropTypes.string,
        status: PropTypes.string,
        message: PropTypes.string
    }

    componentDidMount(){
        // Hiding the notification block on start.
        this.notificationDiv.current.style.display = 'none';
    }

    handleChange = e => this.setState({ currentValue: e.target.value })

    handleSubmit = e => {
        const { transformToLowerCase, transformToUpperCase, mode } = this.props
        const { currentValue } = this.state
        const action = mode === 'upper' ? transformToUpperCase : transformToLowerCase
        e.preventDefault()
        action(currentValue)

        // Displaying the notification block on submit.
        // Timeout for the notification block.
        this.notificationDiv.current.style.display = 'block';
        if(this.notificationDiv.current){
            setTimeout(() => {
                this.notificationDiv.current.style.display= 'none'
            },4000)
        }
    }

    removeDiv(event){
        event.preventDefault();
        event.target.parentElement.style.display = "none";
    }

    render() {
        const { currentValue } = this.state
        const { transformedValue } = this.props
        
        return (
            <div className="TextTransformer-container">
                <form onSubmit={this.handleSubmit}>
                    <input value={currentValue} type="text" placeholder="Enter text to transform" onChange={this.handleChange} />
                    <button type="submit">Transform Text</button>
                </form>
                <p>Transformed Text: {transformedValue}</p>

                {/* Notifications in place. */}
                <div ref={this.notificationDiv} className={this.props.status}>
                    {this.props.message}
                    <button onClick={(event) => this.removeDiv(event)} className="btn">
                        &times;
                    </button>
                </div>

            </div>
        )
    }
}