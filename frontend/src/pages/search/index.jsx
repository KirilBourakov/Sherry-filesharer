import { useRef, useState } from "react"
import { FaPlus, FaMinus } from "react-icons/fa";

export default function Search(){
    const searchSharedWith = useRef();
    const searchPublic = useRef();
    const searchMine = useRef();

    const [inputs, setInputs] = useState(1)
    const [search, setSearch] = useState({})

    const createNumberArray = (num) => {
        return Array.from({ length: num }, (_, index) => index + 1);
    }
    const update = () => {
        let copy = {...search}
        copy['searchSharedWith'] = searchSharedWith.current.checked
        copy['searchPublic'] = searchMine.current.checked
        copy['searchMine'] = searchPublic.current.checked

        setSearch(copy)
    }
    const validQuery = () => {
        const allSearchFalse = inputs.searchSharedWith === false && inputs.searchPublic === false && inputs.searchMine === false
        if (allSearchFalse){
            return false
        }
        for (const [key, value] of Object.entries(search)) {
            const isObject = typeof value === 'object' && !Array.isArray(value) && value !== null
            if (isObject){
                const hasATrueValue = value['query'] && (value['useTags'] || value['useName'] || value['useOwner'] || value['useSharedWith'])
                if (hasATrueValue){
                    return true
                }
            }
        }  
        return false         
    }

    const sendSearch = async (e) => {
        e.preventDefault()
        if (!validQuery()){
            return
        }

        // todo: connect to database
    }

    return(
        <div className="d-flex flex-column w-screen">
            <h1 className="mx-auto">Search</h1>
            
                <form className="mx-auto">
                    {createNumberArray(inputs).map(c =>
                        <Input num={c} search={search} updateSearch={setSearch} key={c}/>
                    )}

                    <div className="d-flex align-items-center">
                        <button className="btn btn-primary me-auto" type="submit" onClick={(e) => {sendSearch(e)}}>Search</button>
                        <FaPlus style={{cursor: 'pointer'}} onClick={() => setInputs(inputs+1)}/>
                        <FaMinus style={{cursor: 'pointer'}} onClick={() => setInputs(inputs-1)}/>
                    </div>  

                    <div className="form-check form-switch ms-1" style={{ display: 'flex', alignItems: 'center' }}>
                        <input className="form-check-input" type="checkbox" id={`searchMine`} ref={searchMine} onChange={update}/>
                        <label className="form-check-label mb-0" htmlFor={`searchMine`} style={{ marginLeft: '5px' }} >Search My Content</label>
                    </div>

                    <div className="form-check form-switch ms-1" style={{ display: 'flex', alignItems: 'center' }}>
                        <input className="form-check-input" type="checkbox" id={`searchSharedWith`} ref={searchSharedWith} onChange={update}/>
                        <label className="form-check-label mb-0" htmlFor={`searchSharedWith`} style={{ marginLeft: '5px' }} >Search Content Shared With Me</label>
                    </div>

                    <div className="form-check form-switch ms-1" style={{ display: 'flex', alignItems: 'center' }}>
                        <input className="form-check-input" type="checkbox" id={`searchPublic`} ref={searchPublic} onChange={update}/>
                        <label className="form-check-label mb-0" htmlFor={`searchPublic`} style={{ marginLeft: '5px' }} >Search Public Content</label>
                    </div>
                </form>
        </div>
    )
}

function Input({ num, search, updateSearch }){
    const inputRef = useRef();
    const tags = useRef();
    const name = useRef();
    const owner = useRef();
    const sharedWith = useRef();
    
    const update = () => {
        let copy = {...search}
        copy[num] = {
            'query': inputRef.current.value,
            'useTags': tags.current.checked,
            'useName': name.current.checked,
            'useOwner': owner.current.checked,
            'useSharedWith': sharedWith.current.checked,
        }
        updateSearch(copy)
    }

    return(
        <div className="mb-3">
            <label htmlFor={`input${num}`} className="form-label">Search condition {num}</label>
            <input type="text" className="form-control" id={`input${num}`} aria-describedby="Input For Advanced Search" ref={inputRef} onChange={update}/>
            
            <div className="d-flex align-items-center">

                <div className="form-check form-switch ms-1" style={{ display: 'flex', alignItems: 'center' }}>
                    <input className="form-check-input" type="checkbox" id={`searchTags${num}`} ref={tags} onChange={update}/>
                    <label className="form-check-label mb-0" htmlFor={`searchTags${num}`} style={{ marginLeft: '5px' }}>Search Tags</label>
                </div>

                <div className="form-check form-switch ms-1" style={{ display: 'flex', alignItems: 'center' }}>
                    <input className="form-check-input" type="checkbox" id={`searchName${num}`} ref={name} onChange={update}/>
                    <label className="form-check-label mb-0" htmlFor={`searchName${num}`} style={{ marginLeft: '5px' }} >Search Name</label>
                </div>

                <div className="form-check form-switch ms-1" style={{ display: 'flex', alignItems: 'center' }}>
                    <input className="form-check-input" type="checkbox" id={`searchOwners${num}`} ref={owner} onChange={update}/>
                    <label className="form-check-label mb-0" htmlFor={`searchOwners${num}`} style={{ marginLeft: '5px' }} >Search Owners</label>
                </div>

                <div className="form-check form-switch ms-1" style={{ display: 'flex', alignItems: 'center' }}>
                    <input className="form-check-input" type="checkbox" id={`searchSharedWith${num}`} ref={sharedWith} onChange={update}/>
                    <label className="form-check-label mb-0" htmlFor={`searchSharedWith${num}`} style={{ marginLeft: '5px' }} >Search Owners</label>
                </div>

            </div>
        </div>
    )
}