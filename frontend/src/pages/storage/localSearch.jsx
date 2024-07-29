import { useRef } from "react";

export default function LocalSearch({content, setContents}){
    const searchRef = useRef()

    const search = () => {
        const term = searchRef.current.value
        const updatedContent = {
            ...content,
            directories: content.directories.map(directory => {
                const isStr = typeof directory.tags === 'string' || directory.tags instanceof String;
                return {
                    ...directory,
                    show: directory.directory_name.includes(term) || (isStr && directory.tags.includes(term))
                };
            }),
            files: content.files.map(file => {
                const isStr = typeof file.tags === 'string' || file.tags instanceof String;
                return {
                    ...file,
                    show: file.filename.includes(term) || (isStr && file.tags.includes(term))
                };
            })
        };
        setContents(updatedContent);
    }

    return(
        <form>
            <div className="row">
                <div className="col-3 p-0">
                    <div className="form-group">
                        <input type="text" className="form-control" ref={searchRef} placeholder="Search" onChange={search} />
                    </div>
                </div>
            </div>
        </form>
    );
}