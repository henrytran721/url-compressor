import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../sass/index.scss';

const Home = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [invalidUrl, setInvalidUrl] = useState('');
    const [foundUrl, setFoundUrl] = useState('');
    
    const handleChange = (e, setFunction) => {
        setFunction(e.target.value);
    }

    // useEffect(() => {
    //     const compressedUrl = document.querySelector('.compressedUrl');
    //     // if((invalidUrl || foundUrl) && compressedUrl) {
    //     //     compressedUrl.style.display = 'none';
    //     // }
    // }, [shortUrl, invalidUrl, foundUrl])

    const handleSubmit = (e) => {
        const invalidUrlElem = document.querySelector('.invalidUrl');
        // prevent default action
        e.preventDefault();
        axios.post('http://localhost:5000/api', { originalUrl })
        .then((res) => {
            if(res.data.shortUrl) {
                setShortUrl(res.data.shortUrl)
            } else if(res.data.invalidUrl) {
                setInvalidUrl(res.data.invalidUrl)
                invalidUrlElem.innerHTML = invalidUrl;
            } else if(res.data.foundUrl) {
                setFoundUrl(res.data.foundUrl);
                invalidUrlElem.innerHTML = `Url has already been compressed: <a href=${foundUrl}>${foundUrl}</a>`;
            }
        })
        .then(
            setOriginalUrl('')
        )
    }

    return (
        <div className='homeContainer'>
            <h1>Henri's Url Compressor</h1>
            <form name='urlCompressor' className='urlCompressForm'>
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
            {shortUrl.length > 0 ? <p className='compressedUrl'>Compressed Url: <a href={shortUrl}>{shortUrl}</a></p> : ''}
            <p className='invalidUrl'></p>
            <a href='/stats'>Track clicks of a link</a>
        </div>
    )
}

export default Home;