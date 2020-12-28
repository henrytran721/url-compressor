import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [invalidUrl, setInvalidUrl] = useState('');
    const [foundUrl, setFoundUrl] = useState('');
    
    const handleChange = (e, setFunction) => {
        setFunction(e.target.value);
    }

    const handleSubmit = (e) => {
        // prevent default action
        e.preventDefault();
        axios.post('http://localhost:5000/api', { originalUrl })
        .then((res) => {
            if(res.data.shortUrl) {
                setShortUrl(res.data.shortUrl)
                setInvalidUrl('')
            } else if(res.data.invalidUrl) {
                setInvalidUrl(res.data.invalidUrl)
                setFoundUrl('')
            } else if(res.data.foundUrl) {
                setFoundUrl(res.data.foundUrl)
                setInvalidUrl('')
            }
        })
        .then(
            setOriginalUrl('')
        )
    }

    return (
        <div className='homeContainer'>
            <h1>Henri's Url Compressor</h1>
            <form name='urlCompressor'>
                <input
                    type='text'
                    name='originalUrl'
                    value={originalUrl}
                    placeholder='Please enter a url'
                    id='originalUrl'
                    onChange={(e) => handleChange(e, setOriginalUrl)}
                />
                <button type='submit' className='shrinkUrl' onClick={handleSubmit}>Shrink</button>
            </form>
            {shortUrl.length > 0 ? <p>Compressed Url: <a href={shortUrl}>{shortUrl}</a></p> : ''}
            {invalidUrl.length > 0 ? <p>{invalidUrl}</p> : ''}
            {foundUrl.length > 0 ? <p>Url has already been converted: <a href={foundUrl}>{foundUrl}</a></p> : ''}
        </div>
    )
}

export default Home;