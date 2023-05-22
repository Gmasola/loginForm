import { useState } from 'react';
import { Fragment } from 'react';
import italy from './img/italy.png'
import germany from './img/germany.png'
import france from './img/france.png'
import classes from './Countries.module.css';
import up from './img/up.png'
import down from './img/down.png'

function Countries({ handleChange, selectedCountry }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCountry = (country) => {
    handleChange({ target: { name: 'country', value: country } });
    setIsOpen(false);
  };

  const getCountryImage = (country) => {
    switch (country) {
      case 'Italy':
        return italy;
      case 'France':
        return france;
      case 'Germany':
        return germany;
      default:
        return null;
    }
  };


  return (
    <ul className={`${classes.countries} ${isOpen ? classes.open : ''}`} id="country" onClick={toggleDropdown}>
      {isOpen? <img className={classes.up_down} src={up}></img>:<img className={classes.up_down} src={down}></img>}
      <hr className={classes.hr1} />
      
      {selectedCountry? <li className={classes.country}  ><img src={getCountryImage(selectedCountry)} alt={selectedCountry} />{selectedCountry}</li>:<li>Nazionalità </li>}      
      {isOpen && (
        <Fragment>
          <hr className="hr2" />
          <hr className="hr3" />
          <li className={`${classes.country} ${classes.italy}`} onClick={() => selectCountry('Italy')}>
            <img src={italy} alt='italy' />
            Italia
          </li>
          <li className={`${classes.country} ${classes.france}`} onClick={() => selectCountry('France')}>
            <img src={france} alt='france' />
            Francia
          </li>
          <li className={`${classes.country} ${classes.germany}`} onClick={() => selectCountry('Germany')}>
            <img src={germany} alt='germany' />
            Germania
          </li>
        </Fragment>
      )}
    </ul>
  )
}

export default Countries