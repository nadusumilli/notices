import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TextTransformer extends Component {
    state = {
        currentValue: '',
        status: null
    }

    static propTypes = {
        mode: PropTypes.oneOf(['lower', 'upper']),
        transformToLowerCase: PropTypes.func.isRequired,
        transformToUpperCase: PropTypes.func.isRequired,
        transformedValue: PropTypes.string
    }

    handleChange = e => this.setState({ currentValue: e.target.value })

    handleSubmit = e => {
        const { transformToLowerCase, transformToUpperCase, mode } = this.props
        const { currentValue } = this.state
        const action = mode === 'upper' ? transformToUpperCase : transformToLowerCase
        e.preventDefault()
        action(currentValue)
    }

    componentWillUpdate(nextProps, nextState){
        if(this.props.isLoading !== nextProps.isLoading || this.props.isSuccess !== nextProps.isSuccess){            
            if(nextProps.isSuccess){
                this.setState({ status: 'Success' });
            }
            else if(!nextProps.isSuccess && !nextProps.isLoading){
                this.setState({ status: 'Error' });
            }
            else if(nextProps.isLoading){
                this.setState({ status: 'Loading' });
            }
            else{
                this.setState({ status: null });
            }
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
                <div className={this.state.status}>{this.state.status} <button onClick={(event) => this.removeDiv(event)} className="btn">&times;</button></div>
            </div>
        )
    }
}