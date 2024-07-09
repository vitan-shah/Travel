import { format } from 'date-fns';
import React, { useState } from 'react';
import { useContext } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import SearchItem from '../../components/searchItem/SearchItem';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './list.css';

const List = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(9999);

    const { dispatch } = useContext(SearchContext);

    const { data, loading, error, reFetch } = useFetch(
        `/api/hotels?city=${destination}&min=${minPrice}&max=${maxPrice}`
    );
    const handleOptions = (e) => {
        setOptions({ ...options, [e.target.id]: Number(e.target.value) });
    }
    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        reFetch();
    }
    return (
        <>
            <div>
                <Navbar />
                <Header type="list" />
                <div className="listContainer">
                    <div className="listWrapper">
                        <div className="listSearch">
                            <h1 className="lsTitle">Search</h1>
                            <div className="lsItem">
                                <label htmlFor="destination">Destination</label>
                                <input
                                    type="text"
                                    id='destination'
                                    placeholder={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="lsItem">
                                <label htmlFor="checkin">Check-in Date</label>
                                <span onClick={() => setOpenDatePicker((prev) => !prev)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                                {openDatePicker && <DateRange
                                    onChange={item => setDates([item.selection])}
                                    ranges={dates}
                                    minDate={new Date()}
                                    className="lsDate"
                                />}
                            </div>
                            <div className="lsItem">
                                <label>Options</label>
                                <div className="lsOptions">
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">
                                            Min price <small>per night</small>
                                        </span>
                                        <input
                                            type="number"
                                            onChange={e => setMinPrice(e.target.value)}
                                            className="lsOptionInput"
                                        />
                                    </div>
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">
                                            Max price <small>per night</small>
                                        </span>
                                        <input
                                            type="number"
                                            onChange={e => setMaxPrice(e.target.value)}
                                            className="lsOptionInput"
                                        />
                                    </div>
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">Adult</span>
                                        <input
                                            type="number"
                                            id='adult'
                                            min={1}
                                            className="lsOptionInput"
                                            placeholder={options.adult}
                                            onChange={handleOptions}
                                        />
                                    </div>
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">Children</span>
                                        <input
                                            type="number"
                                            id='children'
                                            min={0}
                                            className="lsOptionInput"
                                            placeholder={options.children}
                                            onChange={handleOptions}
                                        />
                                    </div>
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">Room</span>
                                        <input
                                            type="number"
                                            id='room'
                                            min={1}
                                            className="lsOptionInput"
                                            placeholder={options.room}
                                            onChange={handleOptions}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSearch}>Search</button>
                        </div>
                        <div className="listResult">
                            {loading ? (
                                "loading"
                            ) : (
                                <>
                                    {data.map((item) => (
                                        <SearchItem item={item} key={item._id} />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;