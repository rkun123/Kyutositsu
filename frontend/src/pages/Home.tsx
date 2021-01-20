import React from 'react'
import Posts from '../components/Posts' 
import TagSelector from '../components/TagSelector'


function Home() {

    return (
        <React.Fragment>
            <TagSelector />
            <Posts />
        </React.Fragment>
    )
}

export default Home