import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Singgle = () => {
  //params
  const params = useParams();
  const navigate = useNavigate();
  const ID = params.id;

  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  //getPost
  const [note, setNote] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/note/${ID}`)
      .then((res) => {
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ID]);

  const handleUpdate = (e) => {
    const NewNote = {
      title,
      content,
      category,
    };

    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API}/note/${ID}`, NewNote)
      .then((res) => {
        alert("Update Note Success");
        navigate("/mynote");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className="big-title">Edit Note</h1>
      <div className="container-createnote">
        <div className="form-createnote">
          <form onSubmit={handleUpdate}>
            <div className="form-group ">
              <h3>Title</h3>
              <input
                placeholder="Title..."
                type="text"
                maxLength={40}
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group ">
              <h3>Category</h3>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">เลือก...</option>
                <option value="1">งาน</option>
                <option value="2">การเรียน</option>
                <option value="3">อื่นๆ</option>
              </select>
            </div>
            <div className="form-group ">
              <h3>Content</h3>
              <textarea
                placeholder="Content..."
                maxLength={500}
                rows={10}
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="btn-container">
              <button className="btn-custom ">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Singgle;
