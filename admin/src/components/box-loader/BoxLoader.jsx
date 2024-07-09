import React from 'react';
import './boxLoader.scss';

const BoxLoader = ({ children, isLoading }) => {
    return (
        <>
            <div className="loader-container">
                <div className="loader-wrapper">
                    <div className={`loader-overlay ${isLoading && 'is-open'}`}>
                        <div className="loader-icon lg">
                            <div className="loader"></div>
                        </div>
                    </div>
                    <div className="sr-only">
                        Loading...
                    </div>
                </div>
                <div className='children'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default BoxLoader;