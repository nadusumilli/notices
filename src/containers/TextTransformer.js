import { connect } from 'react-redux'
import TextTransformer from '../components/TextTransformer'
import { transformToLowerCase, transformToUpperCase } from '../store/textTransform'

const mapStateToProps = state => ({
    transformedValue: state.textTransform.transformedValue,
    isLoading: state.textTransform.isLoading,
    isSuccess: state.textTransform.isSuccess
})

export default connect(mapStateToProps, { transformToLowerCase, transformToUpperCase })(TextTransformer)