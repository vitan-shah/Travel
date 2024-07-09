import React, { useContext, useState } from 'react';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import {
    faBed,
    faCar,
    faPerson,
    faPlane,
    faTaxi
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });

    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);
    const { user } = useContext(AuthContext);

    const handleOptions = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] - 1
            }
        })
    }
    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate("hotels", { state: { destination, dates, options } });
    }

    return (
        <>
            <div className="header">
                <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                    <div className="headerList">
                        <div className="headerListItem active">
                            <FontAwesomeIcon icon={faBed} />
                            <span>Stays</span>
                        </div>
                        <div className="headerListItem">
                            <FontAwesomeIcon icon={faPlane} />
                            <span>Flights</span>
                        </div>
                        <div className="headerListItem">
                            <FontAwesomeIcon icon={faCar} />
                            <span>Car Rentals</span>
                        </div>
                        <div className="headerListItem">
                            <FontAwesomeIcon icon={faBed} />
                            <span>Attractions</span>
                        </div>
                        <div className="headerListItem">
                            <FontAwesomeIcon icon={faTaxi} />
                            <span>Airport Taxis</span>
                        </div>
                    </div>
                    {type !== "list" &&
                        <>
                            <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                            <p className="headerDesc">
                                Get rewarded for your travels - unlock instant savings of 10% or more with a free Travelsphere account
                            </p>
                            {!user && <button className='headerBtn'>Sign IN / Register</button>}
                            <div className="headerSearch">
                                <div className="headerSearchItem">
                                    <FontAwesomeIcon className='headerIcon' icon={faBed} />
                                    <input
                                        type="text"
                                        placeholder='Where are ou going?'
                                        className='headerSearchInput '
                                        onChange={(e) => setDestination(e.target.value)}
                                    />
                                </div>
                                <div className="headerSearchItem">
                                    <FontAwesomeIcon className='headerIcon' icon={faCalendarDays} />
                                    <span className='headerSearchText' onClick={() => setOpenDatePicker((prev) => !prev)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                                    {openDatePicker && <DateRange
                                        onChange={item => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className="date"
                                        minDate={new Date()}
                                    />}
                                </div>
                                <div className="headerSearchItem">
                                    <FontAwesomeIcon className='headerIcon' icon={faPerson} />
                                    <span className='headerSearchText' onClick={() => setOpenOptions(prev => !prev)}>{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                                    {openOptions && <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button className="optionCounterButton" onClick={() => handleOptions("adult", "d")} disabled={options.adult <= 1}>-</button>
                                                <span className="optionCounterNumber">{options.adult}</span>
                                                <button className="optionCounterButton" onClick={() => handleOptions("adult", "i")}>+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Children</span>
                                            <div className="optionCounter">
                                                <button className="optionCounterButton" onClick={() => handleOptions("children", "d")} disabled={options.children <= 0}>-</button>
                                                <span className="optionCounterNumber">{options.children}</span>
                                                <button className="optionCounterButton" onClick={() => handleOptions("children", "i")}>+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button className="optionCounterButton" onClick={() => handleOptions("room", "d")} disabled={options.room <= 1}>-</button>
                                                <span className="optionCounterNumber">{options.room}</span>
                                                <button className="optionCounterButton" onClick={() => handleOptions("room", "i")}>+</button>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <div className="headerSearchItem">
                                    <button className='headerBtn' onClick={handleSearch}>Search</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Header
