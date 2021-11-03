import React from 'react'

export default function Popup(props) {
    return (prop.trigger) ? (
        <div className='popup'>
            <div className="popup-inner">
                <button className="close-btn">close</button>
                { props.children }
            </div>

        </div>
    ) : "";
}
