import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table'

const Stats = () => {
    const [searchUrl, setSearchUrl] = useState('')
    const [foundUrlData, setFoundUrlData] = useState([])

    const handleChange = (e, setFunction) => {
        setFunction(e.target.value)
    }

    useEffect(() => {
        console.log(foundUrlData);
    }, [foundUrlData])
    
    const handleSubmit = (e) => {
        const tableError = document.querySelector('.tableError');
        e.preventDefault();
        axios.post('http://localhost:5000/stats', {searchUrl})
        .then((res) => {
            console.log(res);
            if(res.data.invalidUrl) {
                tableError.textContent = res.data.invalidUrl;
            } else {
                const dataToPush = res.data[0];
                var findDuplicate = foundUrlData.find((elem) => elem.urlCode === dataToPush.urlCode);
                if(!findDuplicate) {
                    tableError.textContent = '';
                    setFoundUrlData((oldArr) => {
                        return [...oldArr, dataToPush];
                    });
                } else {
                    tableError.textContent = 'Entry already exists in table. Please try again.';
                };
            }
        })
    }

    return (
        <div>
            <h1>Statistics of Compressed Links</h1>
            <form name='linkStats' class='linkStatsForm'>
                <input
                    type='text'
                    name='linkStatsInput'
                    className='linkStatsInput'
                    placeholder='Please enter a compressed link'
                    onChange={(e) => handleChange(e, setSearchUrl)}
                />
                <button type='submit' className='searchUrl' onClick={handleSubmit}>Search</button>
            </form>
            <p class='tableError'></p>
            <Table TableInfo={foundUrlData} />
        </div>
    )
}

export default Stats;