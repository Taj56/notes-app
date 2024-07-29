/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import Trash from "../icons/trash";
const NoteCard = ({note}) => {

    const body = JSON.parse(note.body);
    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);

    let mouseStartPos = {x: 0, y: 0};
    const cardRef = useRef(null);

    const textAreaRef = useRef(null);

    useEffect(()=>{
        autoGrow(textAreaRef);
    }, [])

    const autoGrow = (textAreaRef)=>{
        const {current} = textAreaRef;

        current.style.height = "auto"; // Reset the height
        current.style.height = current.scrollHeight + "px"; // Set the new height

    };

    const mouseDown = (e) => {
        mouseStartPos.x = e.clientX; 
        mouseStartPos.y = e.clientY; 

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    }

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY
        }

        console.log(mouseMoveDir);

        mouseStartPos.x = e.clientX; 
        mouseStartPos.y = e.clientY;

        setPosition({
            x: cardRef.current.offsetLeft - mouseMoveDir.x,
            y: cardRef.current.offsetTop - mouseMoveDir.y
        })
    }

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    };

  return (
    <div className="card" ref={cardRef} style={{backgroundColor: colors.colorBody, left: `${position.x}px`, top: `${position.y}px`}}>
        <div className="card-header" onMouseDown={mouseDown} style={{backgroundColor: colors.colorHeader}}>
            <Trash />
        </div>
        <div className="card-body">
            <textarea name="" ref={textAreaRef} id="" defaultValue={body} style={{color: colors.colorText}}
            onInput={()=> {autoGrow(textAreaRef)}}
            >

            </textarea>
        </div>
    </div>
  )
}
export default NoteCard