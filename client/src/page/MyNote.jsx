import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

export const MyNote = () => {
  const user = useSelector((state) => state.auth.user);
  const [note, setNote] = useState([]);
 
  useEffect(() => {
    if (user && user.CustomerId) {
      axios.get(`${process.env.REACT_APP_API}/note-mynote/${user.CustomerId}`)
        .then((res) => {
          setNote(res.data);
        })
        .catch((error) => {
          console.log("Err is", error);
        });
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure Delete!")) {
      axios.delete(`${process.env.REACT_APP_API}/note/${id}`)
        .then((res) => {
          alert("delete Note Success");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // กรองคำหยาบ
  function filterToxicWords(text) {
    const toxicWords = ["คำหยาบ1", "คำหยาบ2", "ลุงตู่"];
    let filteredText = text;
    toxicWords.forEach((word) => {
      const regex = new RegExp(word, "gi");
      filteredText = filteredText.replace(regex, "***");
    });
    return filteredText;
  }

  // แปลงวันที่
  function formatCreatedAtDate(created_at) {
    const date = new Date(created_at);
    const formattedDate = date.toLocaleDateString("th-TH");
    return formattedDate;
  }

  return (
    <>
      <h1 className="big-title">My Note</h1>
      <div className="container-main-noborder">
        <div className="note-grid">
          {note.map((note) => (
            <div className="note-item" key={note.note_id}>
              <div className="note-item-header">
                <button onClick={() => handleDelete(note.note_id)}>X</button>
              </div>
              <div className="note-item-conten">
                <h2>{filterToxicWords(note.title)}</h2>
                <p>{filterToxicWords(note.content)}</p>
              </div>
              <div className="note-item-footer">
                <span>{formatCreatedAtDate(note.created_at)}</span>
                <Link to={`/note/${note.note_id}`}>
                  <button>Edit Note </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MyNote;
