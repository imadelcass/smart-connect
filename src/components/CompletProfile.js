import React, { useContext, useState } from 'react'
import {Context} from './context'
function CompletProfile() {
    const [names, setname] = useContext(Context)
    const [day , setday] = useState('')
    const [age, setage] = useState('')

    const updateAge = e => {
        setage(e.target.value)
    }
    const updateDay = e => {
        setday(e.target.value)
    }
    const updatName = e => {
        e.preventDefault();
        setname(preNames => [
            ...preNames,{
            age : age,
            day : day
        }])
    }

    return (
        <div className='completProfile'>
            <h1>Hi imad , one more step to done.</h1>
            <form onSubmit={updatName}>
                <input type="text" value={day} onChange={updateDay}/>
                <input type="text" value={age} onChange={updateAge}/>
                <button>submit</button>
            </form>
        </div>
    )
}

export default CompletProfile
