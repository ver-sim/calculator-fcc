import PropTypes from 'prop-types';
import { numbers } from './numbers.js';
import './Buttons.css';

export const Buttons = ({ input }) => {

  return (
    <div id="buttons">
        <button id="equals" onClick={input}>=</button>
        {numbers.map((number, i) => (
            <button key={i} id={number.name} onClick={input}>{number.val}</button>
        ))}
        <button id="add" className="operator-sign" onClick={input}>+</button>
        <button id="subtract" className="operator-sign" onClick={input}>-</button>
        <button id="multiply" className="operator-sign" onClick={input}>*</button>
        <button id="divide" className="operator-sign" onClick={input}>/</button>
        <button id="decimal" onClick={input}>.</button>
        <button id="clear" onClick={input}>AC</button>
    </div>
  )
}

Buttons.propTypes = {
    input: PropTypes.func.isRequired,
}