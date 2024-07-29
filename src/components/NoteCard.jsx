/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { setNewOffset, autoGrow, setZIndex, bodyParcer } from "../utils";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
import DeleteButton from "./DeleteButton";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
const NoteCard = ({note}) => {

    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const {setSelectedNote} = useContext(NoteContext);

    const body = bodyParcer(note.body);
    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);

    let mouseStartPos = {x: 0, y: 0};
    const cardRef = useRef(null);

    const textAreaRef = useRef(null);

    useEffect(()=>{
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
    }, [])

    

    const mouseDown = (e) => {
        if(e.target.className === 'card-header'){

            mouseStartPos.x = e.clientX; 
            mouseStartPos.y = e.clientY; 
    
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
    
            setZIndex(cardRef.current);
            setSelectedNote(note);
        }
    }

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY
        }

        // console.log(mouseMoveDir);

        mouseStartPos.x = e.clientX; 
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPosition(newPosition)
    }

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPositioin = setNewOffset(cardRef.current);
        saveData('position', newPositioin);
    };

    const saveData = async (key, value)=>{
        const payload = {[key]:JSON.stringify(value)}

        try {
            await db.notes.update(note.$id, payload)
        } catch (error) {
            console.error(error)
        }

        setSaving(false);
    }

    const handleKeyUp = ()=>{
        setSaving(true);

        if(keyUpTimer.current){
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(()=>{
            saveData('body', textAreaRef.current.value);
        }, 2000)
    }

  return (
    <div className="card" ref={cardRef} style={{backgroundColor: colors.colorBody, left: `${position.x}px`, top: `${position.y}px`}}>
        <div className="card-header" onMouseDown={mouseDown} style={{backgroundColor: colors.colorHeader}}>
            <DeleteButton  noteId={note.$id}/>

                {
                    saving && (
                        <div className="card-saving">
                            <Spinner color={colors.colorText}/>
                            <span style={{ color: colors.colorText }}>Saving...</span>
                        </div>
                    )}
        </div>
        <div className="card-body">
            <textarea onKeyUp={handleKeyUp} name="" ref={textAreaRef} id="" defaultValue={body} style={{color: colors.colorText}}
            onInput={()=> {autoGrow(textAreaRef)}}
            onFocus={()=>{
                setZIndex(cardRef.current);
                setSelectedNote(note);
            }}
            >

            </textarea>
        </div>
    </div>
  )
}
export default NoteCard