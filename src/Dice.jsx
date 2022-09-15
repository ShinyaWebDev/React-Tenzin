export default function Dice({value, isHeld, holdDice}) {

    const styles = {
        backgroundColor: isHeld ? "#efa56fe1" : "white"
    }
    return (
        <div 
        className="dice-face" 
        style={styles}
        onClick={holdDice}
        >
            <h2 className="dice-num">{value}</h2>
        </div>
    )
}