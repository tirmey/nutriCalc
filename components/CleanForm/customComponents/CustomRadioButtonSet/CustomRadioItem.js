/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { RadioInput } from '../../formElements/RadioOrCheckSet/RadioOrCheckSet';
import RadioOrCheckSetStyled from '../../formElements/RadioOrCheckSet/RadioOrCheckSetStyled';

const CustomRadioItem = props => {
  const { item, elState, changeHandler, globalOptions } = props;

  const options = item.options || globalOptions || [];
  const getOptionsValue = opt => typeof opt === 'string' ? opt : opt.value;
  const getOptionsLabel = opt => typeof opt === 'string' ? opt : (opt.label || opt.value);

  return (
    <div className="custom-radio-set__item">
      <span className="custom-radio-set__label">{item.label}</span>
      <div className="custom-radio-set__radio-div">
        <RadioOrCheckSetStyled className="radio-set">
          {options.map(opt => (
            <div
              key={opt}
              className={`radio-set ${(elState && elState[item.name] === getOptionsValue(opt)) ? 'checked' : ''}`}
            >
              <input
                type="radio"
                id={`${item.name}_${getOptionsValue(opt)}`}
                checked={elState && elState[item.name] === getOptionsValue(opt)}
                name={item.name}
                value={getOptionsValue(opt)}
                onChange={changeHandler}
              />
              <label htmlFor={`${item.name}_${getOptionsValue(opt)}`} tabIndex={0}>
                <RadioInput text={getOptionsLabel(opt)} />
              </label>
            </div>
          ))}
        </RadioOrCheckSetStyled>
      </div>
    </div>
  );
};

export default CustomRadioItem;
