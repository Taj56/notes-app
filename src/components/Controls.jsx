import Addbutton from "./Addbutton"
import Color from "./Color"
import colors from "../assets/colors"
const Controls = () => {
  return (
    <div id="controls">
      <Addbutton />
      {colors.map((color)=>(
        <Color key={color.id} color={color} />
      ))}
    </div>
  )
}
export default Controls