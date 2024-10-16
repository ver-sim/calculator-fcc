import { useState } from "react"
import { Buttons } from "./Buttons"
import './Calculator.css'

export const Calculator = () => {
    const [calc , setCalc] = useState('');
    const [expression, setExpression] = useState('0')
    const exprTrim = expression.trim();

    const isOperator = (sign) => {
        return /[*/+-]/.test(sign)
    }

    const updateCalc = (e) => {
        const val = e.target.innerText
        if (val === 'AC') {
            setCalc('')
            setExpression('0')
        }  else if (isOperator(val)) {
            setExpression(exprTrim + ' ' + val + ' ')
        } else if (val === '=') {
            calculate();
        } else if (val === '0') {
            if(expression.charAt(0) !== '0') {
                setExpression(expression + val);
            }
        } else if (val === '.') {
            const lastNum = expression.split(/[-+/*]/g).pop();
            if (lastNum?.includes('.')) {
                return;
            }
            setExpression(expression + val);
        } else {
            if (expression.charAt(0) === '0') {
                setExpression(expression.slice(1) + val);
            } else {
                setExpression(expression + val);
            }
        }
    };

    const calculate = () => {
       if (isOperator(exprTrim.charAt(expression.length - 1))) {
        return;
       }
       const parts = exprTrim.split(' ');
       const newParts = [];

       for(let i = parts.length - 1; i >= 0; i-- ) {
        if (['*', '/', '+'].includes(parts[i]) && isOperator(parts[i - 1])) {
            newParts.unshift(parts[i]);
            let j = 0;
            let x = i - 1;
            while (isOperator(parts[x])) {
                x--;
                j++;
            }
            i -= j;
        } else {
            newParts.unshift(parts[i]);
        }
       }

       const newExpression = newParts.join(' ');
       if (isOperator(newExpression.charAt(0))) {
            setCalc(eval(calc + newExpression));
        } else {
            setCalc(eval(newExpression))            
        }
        setExpression('')
    };

   
   

  return (
    <div id="calculator">
        <div id="display">
            <div id="result">{calc}</div>
            <div id="expression">{expression || 0}</div>      
        </div>
        <Buttons input={updateCalc} />
    </div>
  )
}
