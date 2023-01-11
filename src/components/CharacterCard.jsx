function CharacterCard(props) {
  const {name, url, health, attacks = []} = props.character
  const damage = attacks.map((attack, i) => {
    return (<h3 key={i}>{attack}</h3>)
  })


  return (
    <div className="card">
      {props.winner && <span className="winner">Winner</span>}
      <h1>{name}</h1>
      <img
        className="character"
        src={url}
        alt="Wizard"
      />
      <div className="health">
        <div className="health-h">
          <h2 className="health-title">Health</h2>
          <h2 className="health-value">{health}</h2>
        </div>
        <progress className={health <= 50 ? (health <= 15 ? "very-low" : "low") : "" } id="file" max="100" value={health}></progress>
      </div>
      <div className="damage">
      <img className="damage-icon" src="icon.png" alt="" />
        {attacks.length > 0 && damage}
      </div>
      {props.player ? <span className="player">You</span> : <span className="player enemy">Enemy</span>}
    </div>
  );
}

export default CharacterCard;
