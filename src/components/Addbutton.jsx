import Plus from "../icons/Plus"
import colors from "../assets/colors"
import { useRef } from "react"
import { db } from "../appwrite/databases"
import { useContext } from "react"
import { NoteContext } from "../context/NoteContext"

const Addbutton = () => {

    const {setNotes} = useContext(NoteContext)

    const startingPos = useRef(10);

    const addNote = async () => {
        const payload = {
            position:JSON.stringify({
                x: startingPos.current,
                y: startingPos.current
            }),
            colors: JSON.stringify(colors[0]),
        }

        startingPos.current += 10;

        const res = await db.notes.create(payload);
        setNotes((prevState) => [res, ...prevState])
    }

  return (
    <div id="add-btn" onClick={addNote}><Plus /></div>
  )
}
export default Addbutton