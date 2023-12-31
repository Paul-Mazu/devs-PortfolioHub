import "./ErrorMessage.css";

export default function ErrorMessage({e}) {

    console.log(e);
  
    return (
      <div className="error">
        <p>You encountered an error {e.code}:</p>
        <p>{e.message}</p>
      </div>
    );
  }