import { db } from "../appwrite/databases"
import Trash from "../icons/trash"
import { useContext } from "react"
import { NoteContext } from "../context/NoteContext"

const DeleteButton = ({noteId}) => {

  const {setNotes} = useContext(NoteContext)

    const handleDelete = async () => {
      db.notes.delete(noteId)
        setNotes((prevState) =>
        prevState.filter((note) => note.$id !== noteId)
        )
    }
  return (
    <div onClick={handleDelete}><Trash /></div>
  )
}
export default DeleteButton